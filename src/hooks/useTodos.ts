import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import { dummyTodoList } from "../assets/data/todoList";
import { useJwtStore } from ".././store";
import { useNavigate } from "react-router-dom";

export default function useTodos() {
  const jwtToken = useJwtStore((state) => state.jwtToken);
  const navigate = useNavigate();
  
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (jwtToken === "") {
      return;
    }
    setTodos(dummyTodoList);
  }, [jwtToken, navigate]);

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

  return {
    todos,
    setCompleted,
    setRemoved,
  }
}
