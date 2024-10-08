import { Link } from "react-router-dom";
import MyTodo from "./components/MyTodo";
import { useJwtStore, useShowDeletedStore, useUserStore } from "./store";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";
import TodoRemove from "./components/TodoRemove";
import DeletedTodo from "./components/DeletedTodo";
import { useState } from "react";
import TodoModal from "./components/TodoModal";
import "./index.css";
import AlertMessage from "./components/Alert";

function App() {
  const jwtToken = useJwtStore((state) => state.jwtToken);
  const userName = useUserStore((state) => state.userName);

  const {
    logout,
    todos,
    setCompleted,
    setRemoved,
    deleteAllCompleted,
    deleteTodo,
    editTodo,
    newTodo,
  } = useTodos();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

  const showDeleted = useShowDeletedStore((state) => state.showDeleted);

  const todosDisplay =
    todos?.filter((todo) => todo.is_removed === showDeleted) || [];

  const filteredTodos = todosDisplay?.filter((todo) => {
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
    useShowDeletedStore.getState().setShowDeleted(false);
  };

  const resetDeleted = () => {
    resetFilter();
    useShowDeletedStore.getState().setShowDeleted(true);
  };

  const logoutHandler = () => {
    logout();
    resetTodos();
  };

  return (
    <main className="container py-10 w-full md:w-1/2 mx-auto overflow-y-auto">
      <div className="row-auto">
        {jwtToken === "" ? (
          <div className="text-end">
            <Link className="px-1" to="/login">
              <span className="bg-green-500 hover:bg-green-800 text-white p-1 rounded-md">
                ログイン
              </span>
            </Link>
            <Link to="/register" className="px-1">
              <span className="bg-blue-500 hover:bg-blue-800 text-white p-1 rounded-md">
                新規登録
              </span>
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                order: 1,
                fontWeight: "bold",
                fontSize: "16px",
                color: "#333",
                marginLeft: "auto",
              }}
              className="px-5"
            >
              {userName}
            </span>
            <button
              style={{ order: 2 }}
              className="px-5"
              onClick={logoutHandler}
            >
              <span className="bg-red-500 hover:bg-red-800 text-white p-1 rounded-md ">
                ログアウト
              </span>
            </button>
          </div>
        )}
        <div className="flex">
          <Link to="/" onClick={resetTodos}>
            <MyTodo />
          </Link>
          {jwtToken !== "" && (
            <>
              <button onClick={resetDeleted}>
                <DeletedTodo />
              </button>
              {!showDeleted && (
                <h1 className="p-3">
                  <span className="text-2xl bg-green-300 px-1 rounded-md hover:bg-green-500">
                    <TodoModal
                      todo={newTodo}
                      title="新規追加"
                      onUpdate={editTodo}
                    />
                  </span>
                </h1>
              )}
            </>
          )}
        </div>
        <div className="py-1 col-span-10">
          <AlertMessage />
        </div>
        {jwtToken !== "" && todos && (
          <TodoRemove
            todos={filteredTodos}
            deleteAllCompleted={deleteAllCompleted}
          />
        )}
        <hr className="mb-3"></hr>
        {jwtToken !== "" ? (
          <div className="flex items-center">
            <button onClick={() => setSelectedCategory(null)}>
              <h2 className="font-semibold text-l p-1">
                <span
                  className={`px-1 rounded-md ${
                    selectedCategory === null
                      ? "bg-gray-500 text-white"
                      : "bg-gray-200 hover:bg-gray-500"
                  }`}
                >
                  カテゴリ：
                </span>
              </h2>
            </button>
            <button onClick={() => setSelectedCategory("work")}>
              <h2 className="font-semibold text-l p-1">
                <span
                  className={`px-1 rounded-md ${
                    selectedCategory === "work"
                      ? "bg-purple-500 text-white"
                      : "bg-purple-200 hover:bg-purple-500"
                  }`}
                >
                  仕事
                </span>
              </h2>
            </button>
            <button onClick={() => setSelectedCategory("home")}>
              <h2 className="font-semibold text-l p-1">
                <span
                  className={`px-1 rounded-md ${
                    selectedCategory === "home"
                      ? "bg-green-500 text-white"
                      : "bg-green-200 hover:bg-green-500"
                  }`}
                >
                  家事
                </span>
              </h2>
            </button>
            <button onClick={() => setSelectedCategory("hobby")}>
              <h2 className="font-semibold text-l p-1">
                <span
                  className={`px-1 rounded-md ${
                    selectedCategory === "hobby"
                      ? "bg-blue-500 text-white"
                      : "bg-blue-200 hover:bg-blue-500"
                  }`}
                >
                  趣味
                </span>
              </h2>
            </button>
            <button onClick={() => setSelectedCategory("others")}>
              <h2 className="font-semibold text-l p-1">
                <span
                  className={`px-1 rounded-md ${
                    selectedCategory === "others"
                      ? "bg-teal-500 text-white"
                      : "bg-teal-200 hover:bg-teal-500"
                  }`}
                >
                  その他
                </span>
              </h2>
            </button>
          </div>
        ) : (
          <div className="px-5">
            <h2>
            ログインしてTodoリストをご確認いただき、新しいTodoアイテムを追加・編集することができます。<br />
            アカウントをお持ちでない場合は、新規登録をお願いいたします。ダミーのメールアドレスでもご登録いただけます。
            </h2>
            <hr className="mt-14 my-3"></hr>
            <footer className="footer">
                <p className="px-3">ソースコードはGithubよりご確認できます: </p>
              <p>
                <a
                  href="https://github.com/msaufi2325/todo-front-end-react"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-blue-300 px-3 rounded-md"
                >
                  Frontend
                </a>
                {" | "}
                <a
                  href="https://github.com/msaufi2325/todo-back-end-go"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-blue-300 px-3 rounded-md"
                >
                  Backend
                </a>
              </p>
            </footer>
          </div>
        )}
        {jwtToken !== "" && (
          <>
            <div className="flex items-center">
              <button onClick={() => setSelectedPriority(null)}>
                <h2 className="font-semibold text-l p-1">
                  <span
                    className={`px-1 rounded-md ${
                      selectedPriority === null
                        ? "bg-gray-500 text-white"
                        : "bg-gray-200 hover:bg-gray-500"
                    }`}
                  >
                    優先度：
                  </span>
                </h2>
              </button>
              <button onClick={() => setSelectedPriority("low")}>
                <h2 className="font-semibold text-l p-1">
                  <span
                    className={`px-1 rounded-md ${
                      selectedPriority === "low"
                        ? "bg-yellow-500 text-white"
                        : "bg-yellow-200 hover:bg-yellow-500"
                    }`}
                  >
                    低い
                  </span>
                </h2>
              </button>
              <button onClick={() => setSelectedPriority("medium")}>
                <h2 className="font-semibold text-l p-1">
                  <span
                    className={`px-3 rounded-md ${
                      selectedPriority === "medium"
                        ? "bg-orange-500 text-white"
                        : "bg-orange-200 hover:bg-orange-500"
                    }`}
                  >
                    中
                  </span>
                </h2>
              </button>
              <button onClick={() => setSelectedPriority("high")}>
                <h2 className="font-semibold text-l p-1">
                  <span
                    className={`px-1 rounded-md ${
                      selectedPriority === "high"
                        ? "bg-red-500 text-white"
                        : "bg-red-200 hover:bg-red-500"
                    }`}
                  >
                    高い
                  </span>
                </h2>
              </button>
            </div>
            <TodoList
              todos={filteredTodos}
              onCompletedChange={setCompleted}
              onRemovedChange={setRemoved}
              onDelete={deleteTodo}
              onUpdate={editTodo}
            />
          </>
        )}
      </div>
    </main>
  );
}

export default App;
