import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoItemProps {
  todos: Todo[];
  onCheckCompletedChange: (id: number, isCheckedCompleted: boolean) => void;
  onCompletedChange: (id: number) => void;
}

export default function TodoList({ todos, onCheckCompletedChange, onCompletedChange }: TodoItemProps) {
  return (
    <>
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onCheckCompletedChange={onCheckCompletedChange}
            onCompletedChange={onCompletedChange}
          />
        ))}
      </div>
      {todos.length === 0 && (
        <p className="text-center text-gray-500">No todos found</p>
      )}
    </>
  );
}
