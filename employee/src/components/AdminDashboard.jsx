import React, { useState } from 'react';
import img1 from '../assets/image/icons8-employee-50.png';
import { AiOutlineDashboard } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { IoMdArrowDropright } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUsers } from 'react-icons/fa';
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    axios.get('http://localhost:8080/logout', { withCredentials: true })
      .then(res => {
        setLoading(false);
        if (res.data.message === "Success") {
          navigate('/login');
        } else {
          alert("Error: Logout unsuccessful.");
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        alert("An error occurred during logout.");
      });
  };

  return (
    <>
      <div className={`h-screen w-64 ${isOpen ? 'block' : 'hidden'} sm:block`}>
        <div className="sidenav bg-blue-500 w-80 h-full lg:w-80">
          <img src={img1} alt="Employee Icon" className="float-left w-10 h-10 mt-10 ml-2 mr-2" />
          <h1 className="text-white pt-12 font-serif text-lg text-center lg:text-left">Employee Management System</h1>
          <ul className="text-white mt-20 ml-6 text-lg font-serif">
            <Link to='/dashboardhome'>
              <li className="flex items-center justify-between p-6">
                <div className="flex items-center">
                  <AiOutlineDashboard className="mr-2" /> Dashboard
                </div>
                <IoMdArrowDropright className="ml-8" />
              </li>
            </Link>

            <Link to='/manageemp'>
              <li className="flex items-center justify-between p-6">
                <div className="flex items-center">
                  <FaUsers className="mr-2" /> Manage Employee
                </div>
                <IoMdArrowDropright className="ml-8" />
              </li>
            </Link>

            <Link to='/adminprofile'>
              <li className="flex items-center justify-between p-6">
                <div className="flex items-center">
                  <CgProfile className="mr-2" /> Profile
                </div>
                <IoMdArrowDropright className="ml-8" />
              </li>
            </Link>

            <li className="flex items-center justify-between p-6 cursor-pointer" onClick={handleLogout}>
              <div className="flex items-center">
                <LuLogOut className="mr-2" /> Logout
              </div>
              <IoMdArrowDropright className="ml-8" />
            </li>
          </ul>
        </div>
        {loading && <div className="loading-spinner">Logging out...</div>}
      </div>
      <button
        className="sm:hidden p-4 text-2xl text-black fixed top-0 left-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ImCross /> : <FaBars />}
      </button>
    </>
  );
};

export default AdminDashboard;
