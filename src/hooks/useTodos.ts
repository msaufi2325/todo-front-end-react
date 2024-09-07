import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import { useJwtStore } from ".././store";

export default function useTodos() {
  const jwtToken = useJwtStore((state) => state.jwtToken);
  
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (jwtToken === "") {
      return;
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    }

    fetch("http://localhost:8081/todos", requestOptions)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error(error));

  }, [jwtToken]);

  function setCompleted(id: number, isCompleted: boolean) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted } : todo
      )
    );
  }

  function setRemoved(id: number) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isRemoved: !todo.is_removed } : todo
      )
    );
  }

  function deleteAllCompleted() {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.is_completed ? { ...todo, isRemoved: true } : todo
      )
    );
  }

  function deleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo
      .id !== id)
    );
  }

  function onUpdate(updatedTodo: Todo) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
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
  };
  const [newTodo, setNewTodo] = useState<Todo>(newTodoInit);
  function resetNewTodo() {
    setNewTodo(newTodoInit);
  }

  function addTodo (newTodo: Todo) {
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
      }
    ]);
  }

  return {
    todos,
    setCompleted,
    setRemoved,
    deleteAllCompleted,
    deleteTodo,
    onUpdate,
    addTodo,
    newTodo,
  }
}
