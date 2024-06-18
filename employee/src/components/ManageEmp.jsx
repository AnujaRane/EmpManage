import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import { FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManageEmp = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch employee data from backend API
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

  const handleApprove = (id) => {
    axios.put(`http://localhost:8080/employees/approve/${id}`, {}, { withCredentials: true })
      .then(res => {
        // Update the employee list to reflect the approved status
        setEmployees(employees.map(emp => emp.id === id ? { ...emp, approved: true } : emp));
      })
      .catch(err => {
        console.error('Error approving employee:', err);
        setError(err.response ? err.response.data : 'Server error');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="main-container max-w-full lg:max-w-[1210px] mx-auto lg:ml-80 h-20 border-b-2 border-indigo-600">
        <div className="flex justify-center lg:justify-center">
          <h1 className="text-center text-3xl font-sans font-bold p-4 flex items-center bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">
            <FaUsers className="text-blue-800 mr-4" /> Manage Employee
          </h1>
        </div>

        {/* Add employee button */}
        <div className="btn-container flex mt-10 justify-center lg:justify-start bg-green-700 w-40 items-center mx-auto lg:ml-10 rounded-sm text-white font-serif text-md p-2">
          <Link to="/hraddemp">Add Employee</Link>
        </div>

        {/* Table */}
        <div className="cards flex mt-10 lg:mt-20 font-serif overflow-x-auto lg:ml-8">
          <table className="border-2 lg:w-full mx-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 lg:px-4 lg:py-2">Name</th>
                <th className="border border-gray-400 lg:px-4 lg:py-2">Email</th>
                <th className="border border-gray-400 lg:px-4 lg:py-2">Approved</th>
                <th className="border border-gray-400 lg:px-4 lg:py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="text-center">
                  <td className="border border-gray-400 lg:px-2 px-4 py-2">{employee.name}</td>
                  <td className="border border-gray-400 lg:px-2 px-4 py-2">{employee.email}</td>
                  <td className="border border-gray-400 lg:px-2 px-4 py-2">
                    {employee.approved ? 'Yes' : 'No'}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {!employee.approved && (
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleApprove(employee.id)}
                      >
                        Approve
                      </button>
                    )}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Edit</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Dashboard Component */}
      <div className="container flex mr-20 -ml-3.5 -mt-24">
        <AdminDashboard />
      </div>
    </div>
  );
};

export default ManageEmp;
