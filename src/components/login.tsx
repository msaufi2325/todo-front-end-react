import { useState } from "react";
import Input from "./form/Input";

function Login (){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className="container py-10 w-full md:w-1/2 mx-auto overflow-y-auto">
      <div><h2>Login</h2></div>
      <hr />

      <form onSubmit={(e) => e.preventDefault()}>
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
  )
}

export default Login;
