import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Empheader from '../Empheader';

const EmpRegister = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
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
    if (values.password !== values.cpassword) {
      setError("Passwords do not match");
      return;
    }
    axios.post('http://localhost:8080/register', values)
      .then(res => {
        navigate('/emplogin');
      })
      .catch(err => {
        setError("Signup failed. Please try again.");
        console.error("Error:", err);
      });
  };

  return (
    <div>
      <Empheader />
      <div className="form-container border-2 border-none max-w-md mx-auto mt-16 p-4 md:mt-36 rounded shadow-md shadow-blue-600">
        <form className="font-serif" onSubmit={handleSubmit}>
          <h1 className="text-center text-lg tracking-wider font-bold p-4">SIGN-UP</h1>
          <div className="flex flex-col items-center">
            {error && <div className="text-red-500">{error}</div>}
            <input
              type="text"
              name="name"
              placeholder="Enter Name...."
              onChange={handleInput}
              className="w-full md:w-80 rounded-md mt-6 p-2 shadow shadow-slate-950"
              required
            />
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
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm Password...."
              onChange={handleInput}
              className="w-full md:w-80 rounded-md mt-6 p-2 shadow shadow-slate-950"
              required
              minLength="8"
            />
            <button
              type="submit"
              className="shadow shadow-slate-950 p-2 w-full md:w-20 mt-6 mb-8 hover:bg-slate-600 hover:text-white text-lg"
            >
              Register
            </button>
            <p className='text-sm flex'>You have already register than click on login.
            <Link to='/emplogin'><li className='flex flex-col text-blue-700 underline underline-offset-4 ml-2'>Employee Login</li></Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpRegister;
