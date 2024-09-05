import { Link } from "react-router-dom";
import MyTodo from "./components/MyTodo";
import { useJwtStore, useShowDeletedStore } from "./store";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";
import TodoRemove from "./components/TodoRemove";
import DeletedTodo from "./components/DeletedTodo";
import { useState } from "react";
import TodoModal from "./components/TodoModal";
import "./index.css";

function App() {
  const jwtToken = useJwtStore((state) => state.jwtToken);
  const setLogoutJwtToken = useJwtStore((state) => state.setLogoutJwtToken);

  const { todos, setCompleted, setRemoved, deleteAllCompleted, deleteTodo, onUpdate, addTodo, newTodo } = useTodos();
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
            <button onClick={setLogoutJwtToken}>
              <span className="bg-red-500 hover:bg-red-800 text-white p-1 rounded-md">
                Logout
              </span>
            </button>
          )}
        </div>
        <div className="flex gap-1">
          <Link to="/" onClick={resetTodos}>
            <MyTodo />
          </Link>

          {jwtToken !== "" && (
            <>
              {!showDeleted && (
                <h1 className="p-3">
                  <span className="text-2xl bg-green-300 px-1 rounded-md hover:bg-green-500" >
                    <TodoModal
                      todo={newTodo}
                      title="Add New Todo"
                      onUpdate={addTodo}
                    />
                  </span>
                </h1>
              )}

              <button onClick={resetDeleted}>
                <DeletedTodo />
              </button>
            </>
          )}
        </div>
        {jwtToken !== "" && (
          <TodoRemove
            todos={filteredTodos}
            deleteAllCompleted={deleteAllCompleted}
          />
        )}
        <hr className="mb-3"></hr>
        {jwtToken !== "" ? (
          <div className="flex items-center gap-1">
            <button onClick={() => setSelectedCategory(null)}>
              <h2 className="font-semibold text-xl p-1">
                <span className="bg-gray-200 px-1 rounded-md hover:bg-gray-500">
                  Category:
                </span>
              </h2>
            </button>
            <button onClick={() => setSelectedCategory("work")}>
              <h2 className="font-semibold text-xl p-1">
                <span className={`px-1 rounded-md ${selectedCategory === "work" ? "bg-purple-500" : "bg-purple-200 hover:bg-purple-500"}`}>
                  Work
                </span>
              </h2>
            </button>
            <button onClick={() => setSelectedCategory("home")}>
              <h2 className="font-semibold text-xl p-1">
                <span className={`px-1 rounded-md ${selectedCategory === "home" ? "bg-green-500" : "bg-green-200 hover:bg-green-500"}`}>
                  Home
                </span>
              </h2>
            </button>
            <button onClick={() => setSelectedCategory("hobby")}>
              <h2 className="font-semibold text-xl p-1">
                <span className={`px-1 rounded-md ${selectedCategory === "hobby" ? "bg-blue-500" : "bg-blue-200 hover:bg-blue-500"}`}>
                  Hobby
                </span>
              </h2>
            </button>
            <button onClick={() => setSelectedCategory("others")}>
              <h2 className="font-semibold text-xl p-1">
                <span className={`px-1 rounded-md ${selectedCategory === "others" ? "bg-teal-500" : "bg-teal-200 hover:bg-teal-500"}`}>
                  Others
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
              <button onClick={() => setSelectedPriority(null)}>
                <h2 className="font-semibold text-xl p-1">
                  <span className="bg-gray-200 px-1 rounded-md hover:bg-gray-500">
                    Priority:
                  </span>
                </h2>
              </button>
              <button onClick={() => setSelectedPriority("low")}>
                <h2 className="font-semibold text-xl p-1">
                  <span className={`px-1 rounded-md ${selectedPriority === "low" ? "bg-yellow-500" : "bg-yellow-200 hover:bg-yellow-500"}`}>
                    Low
                  </span>
                </h2>
              </button>
              <button onClick={() => setSelectedPriority("medium")}>
                <h2 className="font-semibold text-xl p-1">
                  <span className={`px-1 rounded-md ${selectedPriority === "medium" ? "bg-orange-500" : "bg-orange-200 hover:bg-orange-500"}`}>
                    Medium
                  </span>
                </h2>
              </button>
              <button onClick={() => setSelectedPriority("high")}>
                <h2 className="font-semibold text-xl p-1">
                  <span className={`px-1 rounded-md ${selectedPriority === "high" ? "bg-red-500" : "bg-red-200 hover:bg-red-500"}`}>
                    High
                  </span>
                </h2>
              </button>
            </div>
            <TodoList
              todos={filteredTodos}
              onCompletedChange={setCompleted}
              onRemovedChange={setRemoved}
              onDelete={deleteTodo}
              onUpdate={onUpdate}
            />
          </>
        )}
      </div>
    </main>
  );
}

export default App;
