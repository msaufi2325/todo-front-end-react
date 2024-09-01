import { Link } from "react-router-dom";
import MyTodo from "./components/MyTodo";
import { useJwtStore } from "./store";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";
import TodoRemove from "./components/TodoRemove";
import DeletedTodo from "./components/DeletedTodo";
import SpanColor from "./components/SpanColor";

function App() {
  const jwtToken = useJwtStore((state) => state.jwtToken);
  const setLogoutJwtToken = useJwtStore((state) => state.setLogoutJwtToken);

  const { todos, setCompleted, setRemoved } = useTodos();

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
            <a href="#!" onClick={() => setLogoutJwtToken()}>
              <span className="bg-red-500 hover:bg-red-800 text-white p-1 rounded-md">
                Logout
              </span>
            </a>
          )}
        </div>
        <div className="flex gap-1">
          <MyTodo />
          {jwtToken !== "" && <DeletedTodo />}
        </div>
        {jwtToken !== "" && (
          <TodoRemove todos={todos} deleteAllCompleted={() => {}} />
        )}
        <hr className="mb-3"></hr>
        {jwtToken !== "" ? (
          <div className="flex items-center gap-1">
            <h2 className="font-semibold text-xl p-1">Category:</h2>
            <Link to="#!">
              <h2 className="font-semibold text-xl p-1">
                <SpanColor text="Work" colorType="work" />
              </h2>
            </Link>
            <Link to="#!">
              <h2 className="font-semibold text-xl p-1">
                <SpanColor text="Home" colorType="home" />
              </h2>
            </Link>
            <Link to="#!">
              <h2 className="font-semibold text-xl p-1">
                <SpanColor text="Hobby" colorType="hobby" />
              </h2>
            </Link>
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
              <Link to="#!">
                <h2 className="font-semibold text-xl p-1">
                  <SpanColor text="Low" colorType="low" />
                </h2>
              </Link>
              <Link to="#!">
                <h2 className="font-semibold text-xl p-1">
                  <SpanColor text="Medium" colorType="medium" />
                </h2>
              </Link>
              <Link to="#!">
                <h2 className="font-semibold text-xl p-1">
                  <SpanColor text="High" colorType="high" />
                </h2>
              </Link>
            </div>
            <TodoList
              todos={todos}
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
