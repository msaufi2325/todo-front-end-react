import { useState } from "react";
import Input from "./form/Input";
import { Link } from "react-router-dom";

function Login (){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const payload = {
      email: email,
      password: password
    }

    console.log(payload);
  }

  return (
    <div className="container py-10 w-full md:w-1/2 mx-auto overflow-y-auto">
       <div className="flex text-center gap-1">
          <Link to="/">
            <h1 className="font-bold text-2xl p-3">
              <span className="bg-blue-300 px-1 rounded-md hover:bg-blue-500">
                My Todo
              </span>
            </h1>
          </Link>
        </div>
      <div><h2>Login</h2></div>
      <hr />

      <div className="flex items-center gap-2 border rounded-md p-2 border-gray-400 bg-white hover:bg-slate-50 grow">
        <form onSubmit={handleSubmit}>
          <Input 
            title="Email"
            type="email"
            className="block w-full mt-1"
            name="email"
            placeholder="Email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input 
            title="Password"
            type="password"
            className="block w-full mt-1"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </ form>
      </div>
    </div>
  )
}

export default Login;
