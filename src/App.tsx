import { Link } from "react-router-dom";
import MyTodo from "./components/MyTodo";
import { useJwtStore, useShowDeletedStore } from "./store";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";
import TodoRemove from "./components/TodoRemove";
import DeletedTodo from "./components/DeletedTodo";
import { useState } from "react";

function App() {
  const jwtToken = useJwtStore((state) => state.jwtToken);
  const setLogoutJwtToken = useJwtStore((state) => state.setLogoutJwtToken);

  const { todos, setCompleted, setRemoved, deleteAllCompleted } = useTodos();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

  const showDeleted = useShowDeletedStore((state) => state.showDeleted);

  const todosDisplay = todos.filter(todo => todo.isRemoved === showDeleted);

  const filteredTodos = todosDisplay.filter(todo => {
    return (
      (selectedCategory ? todo.category === selectedCategory : true) &&
      (selectedPriority ? todo.priority === selectedPriority : true)
    );
  });

  const resetFilter = () => {
    setSelectedCategory(null);
    setSelectedPriority(null);
  };

  const resetTodos = () => {
    resetFilter();
    useShowDeletedStore.getState().setShowDeleted(false)
  }

  const resetDeleted = () => {
    resetFilter();
    useShowDeletedStore.getState().setShowDeleted(true)
  };

  return (
    <main className="container py-10 w-full md:w-1/2 mx-auto overflow-y-auto">
      <div className="row-auto">
        <div className="col-auto text-end">
          {jwtToken === "" ? (
            <div>
              <Link className="px-1" to="/login">
                <span className="bg-green-500 hover:bg-green-800 text-white p-1 rounded-md">
                  Login
                </span>
              </Link>
              <Link to="/register" className="px-1">
                <span className="bg-blue-500 hover:bg-blue-800 text-white p-1 rounded-md">
                  Register
                </span>
              </Link>
            </div>
          ) : (
            <button onClick={() => setLogoutJwtToken()}>
              <span className="bg-red-500 hover:bg-red-800 text-white p-1 rounded-md">
                Logout
              </span>
            </button>
          )}
        </div>
        <div className="flex gap-1">
          <Link to="/" onClick={() => resetTodos()}>
            <MyTodo />
          </Link>

          {jwtToken !== "" && (
            <button onClick={() => resetDeleted()}>
              <DeletedTodo />
            </button>
          )}
        </div>
        {jwtToken !== "" && (
          <TodoRemove todos={filteredTodos} deleteAllCompleted={deleteAllCompleted} />
        )}
        <hr className="mb-3"></hr>
        {jwtToken !== "" ? (
          <div className="flex items-center gap-1">
            <h2 className="font-semibold text-xl p-1">Category:</h2>
            <button onClick={() => setSelectedCategory("work")}>
              <h2 className="font-semibold text-xl p-1">
                <span className="bg-purple-200 px-1 rounded-md hover:bg-purple-500">
                  Work
                </span>
              </h2>
            </button>
            <button onClick={() => setSelectedCategory("home")}>
              <h2 className="font-semibold text-xl p-1">
                <span className="bg-green-200 px-1 rounded-md hover:bg-green-500">
                  Home
                </span>
              </h2>
            </button>
            <button onClick={() => setSelectedCategory("hobby")}>
              <h2 className="font-semibold text-xl p-1">
                <span className="bg-blue-200 px-1 rounded-md hover:bg-blue-500">
                  Hobby
                </span>
              </h2>
            </button>
          </div>
        ) : (
          <div>
            <h2>
              Please login to see your todo list and add new todo items. <br />
              Or register if you don't have an account.
            </h2>
          </div>
        )}
        {jwtToken !== "" && (
          <>
            <div className="flex items-center gap-1">
              <h2 className="font-semibold text-xl p-1">Priority:</h2>
              <button onClick={() => setSelectedPriority("low")}>
                <h2 className="font-semibold text-xl p-1">
                  <span className="bg-yellow-200 px-1 rounded-md hover:bg-yellow-500">
                    Low
                  </span>
                </h2>
              </button>
              <button onClick={() => setSelectedPriority("medium")}>
                <h2 className="font-semibold text-xl p-1">
                  <span className="bg-orange-200 px-1 rounded-md hover:bg-purple-500">
                    Medium
                  </span>
                </h2>
              </button>
              <button onClick={() => setSelectedPriority("high")}>
                <h2 className="font-semibold text-xl p-1">
                  <span className="bg-red-200 px-1 rounded-md hover:bg-red-500">
                    High
                  </span>
                </h2>
              </button>
            </div>
            <TodoList
              todos={filteredTodos}
              onCompletedChange={setCompleted}
              onRemovedChange={setRemoved}
            />
          </>
        )}
      </div>
    </main>
  );
}

export default App;
