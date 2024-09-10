import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyTodo from "./MyTodo";
import { useAlertStore, useJwtStore } from "../store";
import Input from "./form/Input";
import AlertMessage from "./Alert";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const setLoginJwtToken = useJwtStore((state) => state.setLoginJwtToken);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      const payload = {
        email: email,
        password: password,
      };
      console.log(payload);
  
      // const requestOptions = {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   credentials: "include",
      //   body: JSON.stringify(payload),
      // };

      // fetch(`/authenticate`, requestOptions)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (data.error) {
            
      //     } else {
            
      //     }
      //   })

      setLoginJwtToken("jwtToken");
      navigate("/");
    }

    
  };

  const alertTitle = useAlertStore((state) => state.alertTitle);
  const alertMessage = useAlertStore((state) => state.alertMessage);
  const alertClass = useAlertStore((state) => state.alertClass);


  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/">
          <MyTodo />
        </Link>
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in
        </h2>
        <div className="py-1 col-span-10">
          <AlertMessage title={alertTitle} message={alertMessage} alertClass={alertClass}/>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <Input
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <Input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
