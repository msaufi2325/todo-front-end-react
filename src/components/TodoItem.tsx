import { Trash2, Undo2 } from "lucide-react";
import { Todo } from "../types/todo";
import SpanColor from "./SpanColor";
import { useShowDeletedStore } from "../store";
import TodoModal from "./TodoModal";

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: number, isCheckedCompleted: boolean) => void;
  onRemovedChange: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onCompletedChange, onRemovedChange, onDelete }: TodoItemProps) {
  const showDeleted = useShowDeletedStore((state) => state.showDeleted);

  return (
    <div className="flex item-center gap-1 px-2">
      {showDeleted ? (
        <></>
      ) : (
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
          className="scale-125"
          title="Check item as completed"
        />
      )}

      <div className="row-span-1 flex flex-col w-12 text-end pt-1">
        <p className="text-xs">
          <SpanColor colorType={todo.category} />
        </p>
        <p className="text-xs">
          <SpanColor colorType={todo.priority} />
        </p>
      </div>
      <label className="flex items-center gap-2 border rounded-md p-2 border-gray-400 bg-white hover:bg-slate-50 grow">
        <TodoModal todo={todo} />
      </label>
      <button
        onClick={() => onRemovedChange(todo.id)}
        className="p-2"
        title={showDeleted ? "Restore todo" : "Delete todo"}
      >
        {showDeleted ? (
          <Undo2 size={20} className="text-gray-500" />
        ) : (
          <Trash2 size={20} className="text-gray-500" />
        )}
      </button>
      {showDeleted && (
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2"
          title="Delete todo permanently"
        >
          <Trash2 size={20} className="text-gray-500" />
        </button>
      )}
    </div>
  );
}
