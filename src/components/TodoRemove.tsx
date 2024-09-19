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
  const completedTodos = todos.filter((todo) => todo.is_completed);
  
  const showDeleted = useShowDeletedStore((state) => state.showDeleted);


  return (
    <div className="text-left">
      {showDeleted ? (
        <p className="text-l px-1">削除されたTodo</p>
      ) : (
        <div className="flex items-center gap-1">
            <p className="text-xl px-1">
            {completedTodos.length}/{todos.length} のタスクが完了しました
            </p>
          {completedTodos.length > 0 && (
            <button
              onClick={() => deleteAllCompleted(todos)}
              className="bg-red-500 text-white px-1 rounded-md hover:bg-red-600"
            >
              完了したTodoを削除
            </button>
          )}
        </div>
      )}
    </div>
  );
}
