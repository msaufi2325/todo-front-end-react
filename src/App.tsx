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
        <div className="col-auto">
          <Link to="/">
            <h1 className="font-bold text-2xl p-3">
              <span className="bg-blue-300 px-1 rounded-md hover:bg-blue-500">
                My Todo
              </span>
            </h1>
          </Link>
        </div>
        <hr className="mb-3"></hr>
      </div>
    </main>
  );
}

export default App;
