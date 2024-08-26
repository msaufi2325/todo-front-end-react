import { useState } from "react";
import Input from "./form/Input";

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
      <div><h2>Login</h2></div>
      <hr />

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
  )
}

export default Login;
