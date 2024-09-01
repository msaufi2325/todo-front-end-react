import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import { dummyTodoList } from "../assets/data/todoList";

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(dummyTodoList);

  useEffect(() => {
    setTodos(todos);
  }, [todos]);

  function setCheckCompleted(id: number, isCheckedCompleted: boolean) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCheckedCompleted } : todo
      )
    );
  }

  return {
    todos,
    setCheckCompleted,
  }
}
