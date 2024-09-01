import { Trash2 } from "lucide-react";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onCheckCompletedChange: (id: number, isCheckedCompleted: boolean) => void;
  onCompletedChange: (id: number) => void;
}

export default function TodoItem({ todo, onCheckCompletedChange, onCompletedChange }: TodoItemProps) {
  return (
    <div className="flex item-center gap-1">
      <input
        type="checkbox"
        checked={todo.isCheckedCompleted}
        onChange={(e) => onCheckCompletedChange(todo.id, e.target.checked)}
        className="scale-125"
      />
      <label className="flex items-center gap-2 border rounded-md p-2 border-gray-400 bg-white hover:bg-slate-50 grow">
        <span
          className={
            todo.isCheckedCompleted ? "line-through text-gray-400" : ""
          }
        >
          {todo.title}
        </span>
      </label>
      <button onClick={() => onCompletedChange(todo.id)} className="p-2">
        <Trash2 size={20} className="text-gray-500" />
      </button>
    </div>
  );
}
