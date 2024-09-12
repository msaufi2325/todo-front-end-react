import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import { useJwtStore } from ".././store";

export default function useTodos() {
  const jwtToken = useJwtStore((state) => state.jwtToken);
  const setJWTToken = useJwtStore((state) => state.setLoginJwtToken);

  const [todos, setTodos] = useState<Todo[]>([]);

  const [ticking, setTicking] = useState<boolean>(false);
  const [tickInterval, setTickInterval] = useState<number>();

  useEffect(() => {
    if (jwtToken === "") {
      fetch("http://localhost:8081/refresh", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJWTToken(data.access_token);
          }
        })
        .catch((error) => {
          console.log("user is not logged in", error);
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
  }, [jwtToken, setJWTToken, setTodos]);

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
      });
  }

  const toggleRefresh = () => {
    console.log("clicked");

    if (!ticking) {
      console.log("turning on ticking");
      const i = setInterval(() => {
        console.log("this will run every second");
      }, 1000);
      setTickInterval(i);
      console.log("setting tick interval to", i);
      setTicking(true);
    } else {
      console.log("turning off ticking");
      console.log("turning off tickInterval", tickInterval);
      setTickInterval(undefined);
      clearInterval(tickInterval);
      setTicking(false);
    }
  };

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
