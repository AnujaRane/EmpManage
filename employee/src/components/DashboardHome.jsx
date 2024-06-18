import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import { MdAdminPanelSettings } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import axios from 'axios';

const DashboardHome = () => {
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = axios.get('http://localhost:8080/employees', { withCredentials: true });
    const fetchAdmins = axios.get('http://localhost:8080/admin/profile', { withCredentials: true });

    Promise.all([fetchEmployees, fetchAdmins])
      .then(([employeesRes, adminsRes]) => {
        setEmployees(employeesRes.data);
        setAdmins(adminsRes.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
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

  const totalAdmins = admins.length;
  const totalEmployees = employees.length;
  const totalSalaries = employees.reduce((total, employee) => total + employee.salary, 0);

  return (
    <div>
      <div className="main-container lg:max-w-[1210px] lg:ml-80 h-20 border border-b-indigo-600 border-y-2">
        <div className='flex'>
          <h1 className="text-center text-3xl font-sans font-bold flex p-4 lg:ml-96 pl-24 items-center bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">
            <MdAdminPanelSettings className='text-blue-800 mr-4' /> Admin Dashboard
          </h1>
        </div>

        {/* cards */}
        <div className="cards lg:flex mt-20">
          <div className="first border-none w-80 h-60 m-auto rounded-lg shadow shadow-blue-500 text-center font-serif">
            <h1 className='text-xl pt-4'><RiAdminFill className='ml-36 text-4xl mb-2' />Admin</h1>
            <hr className='w-72 ml-4 mt-4 border-blue-700 dark:border-blue-700' />
            <h2 className='text-lg mt-16'>Total : {totalAdmins}</h2>
          </div>
          <div className="second border-none w-80 h-60 m-auto rounded-lg shadow shadow-blue-500 text-center font-serif">
            <h1 className='text-xl pt-4'><FaUsers className='ml-36 text-4xl mb-2' />Employee</h1>
            <hr className='w-72 ml-4 mt-4 border-blue-700 dark:border-blue-700' />
            <h2 className='text-lg mt-16'>Total : {totalEmployees}</h2>
          </div>
          <div className="third border-none w-80 h-60 m-auto rounded-lg shadow shadow-blue-500 text-center font-serif">
            <h1 className='text-xl pt-4'><RiMoneyRupeeCircleFill className='ml-36 text-4xl mb-2' />Salary</h1>
            <hr className='w-72 ml-4 mt-4 border-blue-700 dark:border-blue-700' />
            <h2 className='text-lg mt-16'>Total : {totalSalaries}</h2>
          </div>
        </div>
      </div>
      <div className="container flex -mt-20">
        <AdminDashboard />
      </div>
    </div>
  );
};

export default DashboardHome;
