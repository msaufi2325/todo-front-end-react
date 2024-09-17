import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import MyTodo from "./MyTodo";
import { useAlertStore, useJwtStore, useUserStore } from '../store';
import Input from './form/Input';
import useTodos from '../hooks/useTodos';


const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const { toggleRefresh } = useTodos();
  const setLoginJwtToken = useJwtStore((state) => state.setLoginJwtToken);

  const setAlertTitle = useAlertStore((state) => state.setAlertTitle);
  const setAlertMessage = useAlertStore((state) => state.setAlertMessage);
  const setAlertClass = useAlertStore((state) => state.setAlertClass);

  const setLoginUserName = useUserStore((state) => state.setLoginUserName);
  const setLoginUserId = useUserStore((state) => state.setLoginUserID);

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Add your registration logic here
    let valid = true;

    if (!username) {
      setUsernameError('Username is required');
      valid = false;
    } else {
      setUsernameError('');
    }

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
      await fetch("http://localhost:8081/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // or "same-origin" or "omit"
        body: JSON.stringify({ username, email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setAlertTitle("Error");
            setAlertMessage(data.message)
            setAlertClass("alert-danger");
            navigate("/login");
          } else {
            setLoginJwtToken(data.data["access_token"]);
            setLoginUserName(data.data["username"]);
            setLoginUserId(parseInt(data.data["user_id"], 10));
            toggleRefresh(true)
            navigate("/");
          }
        })
        .catch((error) => {
          setAlertTitle("Error");
          setAlertMessage(error.message);
          setAlertClass("alert-danger");
        })

  }
};

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <Link to="/">
          <MyTodo />
        </Link>
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <Input
                name="username"
                type="username"
                autoComplete="username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {usernameError && <p className="text-red-500">{usernameError}</p>}
          </div>

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
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
