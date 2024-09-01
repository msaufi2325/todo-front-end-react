import { Todo } from "../types/todo";

interface TodoRemoveProps {
  todos: Todo[];
  deleteAllCompleted: () => void;
}

export default function TodoRemove({
  todos,
  deleteAllCompleted,
}: TodoRemoveProps) {
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  return (
    <div className="text-left">
      <p className="space-y-2">
        {completedTodos.length}/{todos.length} todos completed
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
  );
}
