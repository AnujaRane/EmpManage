import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/login', values)
      .then(res => {
        navigate('/DashboardHome');
      })
      .catch(err => {
        setError("Login failed. Please try again.");
        console.error("Error:", err);
      });
  };

  return (
    <div>
      <Header />
      <div className="form-container border-2 border-none max-w-lg mx-auto mt-16 p-4 md:mt-36 rounded shadow-md shadow-blue-500">
        <form className="font-serif" onSubmit={handleSubmit}>
          <h1 className="text-center text-lg tracking-wider font-bold p-4">SIGN-IN</h1>
          <div className="flex flex-col items-center">
            {error && <div className="text-red-500">{error}</div>}
            <input
              type="email"
              name="email"
              placeholder="Enter Email...."
              onChange={handleInput}
              className="w-full md:w-80 rounded-md mt-6 p-2 shadow shadow-slate-950"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInput}
              className="w-full md:w-80 rounded-md mt-6 p-2 shadow shadow-slate-950"
              required
              minLength="8"
            />
            <button
              type="submit"
              className="shadow shadow-slate-950 p-2 w-full md:w-40 mt-6 mb-8 hover:bg-slate-600 hover:text-white text-lg"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
