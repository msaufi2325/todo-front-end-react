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
        <p>Deleted Todo</p>
      ) : (
        <div>
          <p className="space-y-2">
            {completedTodos.length}/{todos.length} todos completed
          </p>
          {completedTodos.length > 0 && (
            <button
              onClick={() => deleteAllCompleted(todos)}
              className="bg-red-500 text-white px-1 rounded-md hover:bg-red-600"
            >
              Delete selected todos
            </button>
          )}
        </div>
      )}
    </div>
  );
}
