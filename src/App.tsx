import { useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [jwtToken, setJwtToken] = useState<string>("");

  return (
    <main className="container p-3">
      <div className="row-auto">
        <div className="col-auto text-end">
          {jwtToken === "" ? (
            <button
              className="bg-green-500 hover:bg-green-800 text-white px-1 rounded-md"
              onClick={() => setJwtToken("jwtToken")}
            >
              Login
            </button>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-800 text-white px-1 rounded-md"
              onClick={() => setJwtToken("")}
            >
              Logout
            </button>
          )}
        </div>
        <div className="flex items-start gap-1">
          <Link to="/">
            <h1 className="font-bold text-2xl p-3">
              <span className="bg-blue-300 px-1 rounded-md hover:bg-blue-500">
                My Todo
              </span>
            </h1>
          </Link>
          <Link to="#!">
            <h2 className="font-semibold text-xl p-3">
              <span className="bg-green-200 px-1 rounded-md hover:bg-green-500">
                Completed Items
              </span>
            </h2>
          </Link>
        </div>
        <hr className="mb-3"></hr>
        <div className="flex items-center gap-1">
          <Link to="#!">
            <h2 className="font-semibold text-xl p-1">
              <span className="bg-yellow-200 px-1 rounded-md hover:bg-yellow-500">
                Work
              </span>
            </h2>
          </Link>
          <Link to="#!">
            <h2 className="font-semibold text-xl p-1">
              <span className="bg-red-200 px-1 rounded-md hover:bg-red-500">
                Home
              </span>
            </h2>
          </Link>
          <Link to="#!">
            <h2 className="font-semibold text-xl p-1">
              <span className="bg-blue-200 px-1 rounded-md hover:bg-blue-500">
                Hobby
              </span>
            </h2>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <Link to="#!">
            <h2 className="font-semibold text-xl p-1">
              <span className="bg-yellow-200 px-1 rounded-md hover:bg-yellow-500">
                Low Priority
              </span>
            </h2>
          </Link>
          <Link to="#!">
            <h2 className="font-semibold text-xl p-1">
              <span className="bg-orange-200 px-1 rounded-md hover:bg-orange-500">
                Medium Priority
              </span>
            </h2>
          </Link>
          <Link to="#!">
            <h2 className="font-semibold text-xl p-1">
              <span className="bg-red-200 px-1 rounded-md hover:bg-red-500">
                High Priority
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default App;
