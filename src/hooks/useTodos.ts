import { useState, useEffect, useCallback } from "react";
import { Todo } from "../types/todo";
import { useAlertStore, useJwtStore } from ".././store";

export default function useTodos() {
  const jwtToken = useJwtStore((state) => state.jwtToken);
  const setJWTToken = useJwtStore((state) => state.setLoginJwtToken);

  const [todos, setTodos] = useState<Todo[]>([]);

  const [tickInterval, setTickInterval] = useState<number>();

  const setAlertTitle = useAlertStore((state) => state.setAlertTitle);
  const setAlertMessage = useAlertStore((state) => state.setAlertMessage);
  const setAlertClass = useAlertStore((state) => state.setAlertClass);


  const toggleRefresh = useCallback(
    (status: boolean) => {
      console.log("clicked");

      if (status) {
        console.log("turning on ticking");
        const i = setInterval(() => {
          console.log("this will run every second");
          
          fetch("http://localhost:8081/refresh", {
            method: "GET",
            credentials: "include",
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.access_token) {
                setJWTToken(data.access_token);
              } else if (data.error) {
                console.log("user is not logged in");
                setAlertTitle("Error");
                setAlertMessage(data.message);
                setAlertClass("alert-danger");
              }
            })
            .catch((error) => {
              console.log("user is not logged in");
              setAlertTitle("Error");
              setAlertMessage(error.message);
              setAlertClass("alert-danger");
            });
        }, 1000);
        setTickInterval(i);
        console.log("setting tick interval to", i);
      } else {
        console.log("turning off ticking");
        console.log("turning off tickInterval", tickInterval);
        setTickInterval(undefined);
        clearInterval(tickInterval);
      }
    },
    [tickInterval, setJWTToken, setAlertTitle, setAlertMessage, setAlertClass]
  );

  useEffect(() => {
    if (jwtToken === "") {
      fetch("http://localhost:8081/refresh", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJWTToken(data.access_token);
            toggleRefresh(true);
          } else if (data.error) {
            console.log("user is not logged in");
            setAlertTitle("Error");
            setAlertMessage(data.message);
            setAlertClass("alert-danger");
          }
        })
        .catch((error) => {
          console.log("user is not logged in");
          setAlertTitle("Error");
          setAlertMessage(error.message);
          setAlertClass("alert-danger");

        });
    } else {
      fetch("http://localhost:8081/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setTodos(data))
        .catch((error) => console.error(error));
    }
  }, [jwtToken, toggleRefresh, setJWTToken, setTodos, setAlertMessage, setAlertTitle, setAlertClass]);

  function logout() {
    fetch("http://localhost:8081/logout", {
      method: "GET",
      credentials: "include",
    })
      .catch((error) => {
        console.log("error logging out", error);
      })
      .finally(() => {
        setJWTToken("");
        setTodos([]);
        toggleRefresh(false);
      });
  }

  function setCompleted(id: number, is_completed: boolean) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, is_completed } : todo
      )
    );
  }

  function setRemoved(id: number) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, is_removed: !todo.is_removed } : todo
      )
    );
  }

  function deleteAllCompleted() {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.is_completed ? { ...todo, is_removed: true } : todo
      )
    );
  }

  function deleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function onUpdate(updatedTodo: Todo) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  }

  const newTodoInit: Todo = {
    id: todos.length,
    title: "",
    description: "",
    category: "others",
    priority: "low",
    is_completed: false,
    is_removed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: 1,
  };
  const [newTodo, setNewTodo] = useState<Todo>(newTodoInit);
  function resetNewTodo() {
    setNewTodo(newTodoInit);
  }

  function addTodo(newTodo: Todo) {
    resetNewTodo();
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Math.max(...prevTodos.map((todo) => todo.id)) + 1,
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
    ]);
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
    addTodo,
    newTodo,
  };
}
