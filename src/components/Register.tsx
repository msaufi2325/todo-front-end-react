import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import MyTodo from "./MyTodo";
import { useJwtStore } from '../store';
import Input from './form/Input';


const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const setLoginJwtToken = useJwtStore((state) => state.setLoginJwtToken);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
      const payload = {
        username: username,
        email: email,
        password: password
      };
      console.log(payload);
      setLoginJwtToken();
      navigate("/");
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
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
