import { useState } from "react"

function App() {
  const [jwtToken, setJwtToken] = useState<string>("")

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
          <h1 className="font-bold text-3xl mt-3">My Todo</h1>
        </div>
      </div>
    </main>
  );
}

export default App
