import { Todo } from "../types/todo";
import { useShowDeletedStore } from ".././store";


interface TodoRemoveProps {
  todos: Todo[];
  deleteAllCompleted: (todos: Todo[]) => void;
}

export default function TodoRemove({
  todos,
  deleteAllCompleted,
}: TodoRemoveProps) {
  const completedTodos = todos.filter((todo) => todo.isCompleted);
  
  const showDeleted = useShowDeletedStore((state) => state.showDeleted);


  return (
    <div className="text-left">
      {showDeleted ? (
        <p className="text-xl px-1">Deleted Todo</p>
      ) : (
        <div className="flex items-center gap-1">
          <p className="text-xl px-1">
            {completedTodos.length}/{todos.length} todos completed
          </p>
          {completedTodos.length > 0 && (
            <button
              onClick={() => deleteAllCompleted(todos)}
              className="bg-red-500 text-white px-1 rounded-md hover:bg-red-600"
            >
              Delete completed todo
            </button>
          )}
        </div>
      )}
    </div>
  );
}
