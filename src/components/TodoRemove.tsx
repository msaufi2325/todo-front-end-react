import { Todo } from "../types/todo";
import { useShowDeletedStore } from ".././store";


interface TodoRemoveProps {
  todos: Todo[];
  deleteAllCompleted: () => void;
}

export default function TodoRemove({
  todos,
  deleteAllCompleted,
}: TodoRemoveProps) {
  const todosDisplay = todos.filter((todo) => !todo.isRemoved);
  const completedTodos = todosDisplay.filter((todo) => todo.isCompleted);
  
  const showDeleted = useShowDeletedStore((state) => state.showDeleted);


  return (
    <div className="text-left">
      {showDeleted ? (
        <p>Deleted Todo</p>
      ) : (
        <div>
          <p className="space-y-2">
            {completedTodos.length}/{todosDisplay.length} todos completed
          </p>
          {completedTodos.length > 0 && (
            <button
              onClick={deleteAllCompleted}
              className="bg-red-500 text-white px-1 rounded-md hover:bg-red-600"
            >
              Delete checked items
            </button>
          )}
        </div>
      )}
    </div>
  );
}
