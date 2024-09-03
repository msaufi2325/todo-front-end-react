import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoItemProps {
  todos: Todo[];
  onCompletedChange: (id: number, isCheckedCompleted: boolean) => void;
  onRemovedChange: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (updatedTodo: Todo) => void;
}

export default function TodoList({ todos, onCompletedChange, onRemovedChange, onDelete, onUpdate }: TodoItemProps) {
  return (
    <>
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onCompletedChange={onCompletedChange}
            onRemovedChange={onRemovedChange}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
      {todos.length === 0 && (
        <p className="text-center text-gray-500">No todos found</p>
      )}
    </>
  );
}
