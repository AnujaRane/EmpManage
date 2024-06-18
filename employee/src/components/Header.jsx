import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/image/icons8-employee-50.png';

const Header = () => {
  // State to manage the visibility of the mobile menu
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuVisible(!isMobileMenuVisible);
  };

  return (
    <div>
      {/* Main navbar container */}
      <div className="navbar w-full h-16 bg-blue-600 font-serif flex justify-between items-center px-4">
        {/* Logo */}
        <img src={logo} alt="Employee Management System Logo" className="h-12" />

        {/* Navbar title */}
        <h1 className="text-white text-lg">Employee Management System</h1>

        {/* Menu items */}
        <ul className="hidden md:flex gap-4 text-white text-lg">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/register">Admin Register</Link>
          </li>
          <li>
            <Link to="/login">Admin Login</Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button onClick={toggleMobileMenu} className="block md:hidden text-white">
          {/* Icon for mobile menu button */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile menu items */}
      {isMobileMenuVisible && (
        <div className="md:hidden">
          <ul className="flex flex-col gap-4 p-4 bg-blue-600 text-white font-serif text-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/register">Admin Register</Link>
            </li>
            <li>
              <Link to="/login">Admin Login</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
