import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import { dummyTodoList } from "../assets/data/todoList";
import { useJwtStore } from ".././store";

export default function useTodos() {
  const jwtToken = useJwtStore((state) => state.jwtToken);
  
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (jwtToken === "") {
      return;
    }
    setTodos(dummyTodoList);
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
        todo.id === id ? { ...todo, isRemoved: !todo.isRemoved } : todo
      )
    );
  }

  function deleteAllCompleted() {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.isCompleted ? { ...todo, isRemoved: true } : todo
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
    category: "work",
    priority: "medium",
    isCompleted: false,
    isRemoved: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
        isCompleted: newTodo.isCompleted,
        isRemoved: newTodo.isRemoved,
        createdAt: newTodo.createdAt,
        updatedAt: newTodo.updatedAt,
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
