import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

const Contact = () => {
    const [values, setValues] = useState({
      name: '',
      email: '',
      number: '',
      message: ''
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
      axios.post('http://localhost:8080/contact', values)
        .then(res => {
          navigate('/');
        })
        .catch(err => {
          setError("Signup failed. Please try again.");
          console.error("Error:", err);
        });
    };

  return (
    <div>
      <Header />
      <div className="form-container border-2 border-none max-w-lg mx-auto mt-8 p-4 md:mt-20 rounded shadow-md shadow-blue-500">
        <form className="font-serif" onSubmit={handleSubmit}>
          <h1 className="text-center text-xl tracking-wider font-bold p-4">Contact Us</h1>
          <div className="flex flex-col items-center">
          {error && <div className="text-red-500">{error}</div>}
            <input
              type="text"
              name="name"
              placeholder="Enter Name...."
              onChange={handleInput}
              className="w-full md:w-80 rounded-md mt-4 p-2 shadow shadow-slate-950"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email...."
              onChange={handleInput}
              className="w-full md:w-80 rounded-md mt-4 p-2 shadow shadow-slate-950"
              required
            />
            <input
              type="number"
              name="number"
              placeholder="Enter number...."
              onChange={handleInput}
              className="w-full md:w-80 rounded-md mt-4 p-2 shadow shadow-slate-950"
              required
            />
            <textarea
              name="message"
              placeholder="Enter Your Message...."
              onChange={handleInput}
              className="w-full md:w-80 rounded-md mt-4 p-2 shadow shadow-slate-950"
              required
              rows="5"
            />
            <button
              type="submit"
              className="shadow shadow-slate-950 p-2 w-full md:w-40 mt-6 mb-8 hover:bg-slate-600 hover:text-white text-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
