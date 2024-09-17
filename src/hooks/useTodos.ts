import { useState, useEffect, useCallback } from "react";
import { Todo } from "../types/todo";
import { useJwtStore, useUserStore } from ".././store";
import { useNavigate } from "react-router-dom";

export default function useTodos() {
  const jwtToken = useJwtStore((state) => state.jwtToken);
  const userIDStore = useUserStore((state) => state.userID);
  const setJWTToken = useJwtStore((state) => state.setLoginJwtToken);

  const setUserID = useUserStore((state) => state.setLoginUserID);
  const setUserName = useUserStore((state) => state.setLoginUserName);

  const navigate = useNavigate();

  const [todos, setTodos] = useState<Todo[]>([]);

  const [tickInterval, setTickInterval] = useState<NodeJS.Timeout | undefined>(undefined);


  
  const toggleRefresh = useCallback(
    (status: boolean) => {
      console.log("clicked");

      if (status) {
        console.log("turning on ticking");
        const i = setInterval(() => {
          // TODO: fix refresh token does not work on page reload

          fetch(`${process.env.REACT_APP_BACKEND}/refresh`, {
            method: "GET",
            credentials: "include",
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.access_token) {
                setJWTToken(data.access_token);
              }
            })
            .catch(() => {
              console.log("user is not logged in");
            });
        }, 60000);
        setTickInterval(i);
        console.log("setting tick interval to", i);
        return () => clearInterval(i);
      } else {
        console.log("turning off ticking");
        console.log("turning off tickInterval", tickInterval);
        setTickInterval(undefined);
        clearInterval(tickInterval);
      }
    },
    [tickInterval, setJWTToken]
  );

  useEffect(() => {
    if (jwtToken !== "") {
      fetch(`${process.env.REACT_APP_BACKEND}/todos/all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ user_id: userIDStore }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos(data);
        })
        .catch((error) => {
          console.error(error);
          navigate("/login");
        });
    }
  }, [jwtToken, setTodos, navigate, userIDStore]);

  useEffect(() => {
    if (jwtToken === "") {
      console.log("fetch refresh token");
      fetch(`${process.env.REACT_APP_BACKEND}/refresh`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJWTToken(data.access_token);
            toggleRefresh(true);
          }
        })
        .catch(() => {
          console.log("user is not logged in");
        });
    } 
  }, [jwtToken, setJWTToken, toggleRefresh]);

  function logout() {
    fetch(`${process.env.REACT_APP_BACKEND}/logout`, {
      method: "GET",
      credentials: "include",
    })
      .catch((error) => {
        console.log("error logging out", error);
      })
      .finally(() => {
        setJWTToken("");
        setUserID(0);
        setUserName("");
        setTodos([]);
        toggleRefresh(false);
      });
  }

  async function deleteTodo(id: number) {
      await fetch(`${process.env.REACT_APP_BACKEND}/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`,
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
          }
        })
        .catch((error) => {
          console.error("error deleting todo", error);
        });
    }

  function onUpdate(updatedTodo: Todo) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  }

  const newTodoInit: Todo = {
    id: 0,
    title: "",
    description: "",
    category: "others",
    priority: "low",
    is_completed: false,
    is_removed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: userIDStore,
  };

  const [newTodo, setNewTodo] = useState<Todo>(newTodoInit);

  function resetNewTodo() {
    setNewTodo(newTodoInit);
  }

  function addTodo(newTodo: Todo) {
    setTodos((prevTodos) => {
      if (!prevTodos) {
        prevTodos = [];
      }
      return [
        ...prevTodos,
        {
          id: newTodo.id,
          title: newTodo.title,
          description: newTodo.description,
          category: newTodo.category,
          priority: newTodo.priority,
          is_completed: newTodo.is_completed,
          is_removed: newTodo.is_removed,
          created_at: newTodo.created_at,
          updated_at: newTodo.updated_at,
          user_id: newTodo.user_id,
        },
      ];
    });
  }

  async function editTodo (todo: Todo) {
    resetNewTodo();
    console.log(todo.user_id);

    let method = "PUT";
    if (todo.id > 0) {
      method = "PATCH";
    }

    await fetch(`${process.env.REACT_APP_BACKEND}/todos/${todo.id}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
      credentials: "include",
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          if (method === "PATCH") {
            onUpdate(todo);
          } else if (method === "PUT") {
            addTodo({
              id : data.data["id"],
              title : todo.title,
              description : todo.description,
              category : todo.category,
              priority : todo.priority,
              is_completed : todo.is_completed,
              is_removed : todo.is_removed,
              created_at : todo.created_at,
              updated_at : todo.updated_at,
              user_id : todo.user_id,
            })
          }
        }
      })
      .catch((error) => {
        if (method === "PATCH") {
          console.error("error updating todo", error);
        } else if (method === "PUT") {
          console.error("error adding todo", error);
        }
      })
  }
  async function setRemoved(id: number) {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      try {
        await editTodo({ ...todoToUpdate, is_removed: !todoToUpdate.is_removed });
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, is_removed: todo.is_removed } : todo
          )
        );
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    }
  }

  async function setCompleted(id: number, is_completed: boolean) {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      try {
        await editTodo({ ...todoToUpdate, is_completed });
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, is_completed } : todo
          )
        );
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    }
  }

  function deleteAllCompleted() {
    const completedTodos = todos.filter((todo) => todo.is_completed);
    completedTodos.forEach((todo) => {
      editTodo({
        ...todo,
        is_removed: true,
      });
    });
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.is_completed ? { ...todo, is_removed: true } : todo
      )
    );
  }

  return {
    logout,
    toggleRefresh,
    todos,
    setCompleted,
    setRemoved,
    deleteAllCompleted,
    deleteTodo,
    onUpdate,
    editTodo,
    newTodo,
  };
}
