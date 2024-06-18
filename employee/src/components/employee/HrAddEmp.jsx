import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDashboard from '../AdminDashboard';
import { FaUsers } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const HRAddEmp = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    name: '',
    email: '',
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
    event.preventDefault(); // Prevent default form submission
    axios.post('http://localhost:8080/employees', values)
      .then(res => {
        navigate('/hraddemp');
      })
      .catch(err => {
        setError("Add failed. Please try again.");
        console.error("Error:", err);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:8080/employees', { withCredentials: true })
      .then(res => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching employees:', err);
        setError(err.response ? err.response.data : 'Server error');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="main-container max-w-full lg:max-w-[1210px] mx-auto ml-80 h-20 border-b-2 border-indigo-600">
        <div className="flex justify-center lg:justify-centert">
          <h1 className="text-center text-3xl font-sans font-bold p-4 flex items-center bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">
            <FaUsers className="text-blue-800 mr-4" /> Manage Employee
          </h1>
        </div>
        <form onSubmit={handleSubmit} className='shadow shadow-blue-600 max-w-[500px] h-60 m-auto mt-20'>
          <div className='p-4'>
            <label className='font-serif ml-6'>Name</label>
            <input className='shadow shadow-gray-600 w-80 ml-10 mt-4 border-none decoration-gray-600'  type="text" name="name" onChange={handleInput} required />
          </div>
          <div className='p-4'>
            <label className='font-serif ml-6'>Email</label>
            <input className='shadow shadow-gray-600 w-80 ml-10 mt-4 border-none decoration-gray-600' type="email" name="email" onChange={handleInput} required />
          </div>
          <Link to='/manageemp'>
          <button type="submit" className='p-2 border-2 ml-44 mt-2 bg-gray-800 text-white font-serif rounded-md'>Add Employee</button></Link>
        </form>
        <div className="cards flex mt-10 lg:mt-20 font-serif overflow-x-auto ml-8">
          <table className="border-2 w-full mx-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Email</th>
                <th className="border border-gray-400 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="text-center">
                  <td className="border border-gray-400 px-4 py-2">{emp.name}</td>
                  <td className="border border-gray-400 px-4 py-2">{emp.email}</td>
                  <td className="border border-gray-400 px-4 py-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="container flex mr-20 -ml-3.5 -mt-24">
        <AdminDashboard />
      </div>
    </div>
  );
};

export default HRAddEmp;
