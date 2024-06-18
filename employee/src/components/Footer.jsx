import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TbCircleLetterC } from "react-icons/tb";


const Footer = () => {
  // State to manage the visibility of the mobile menu
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuVisible(!isMobileMenuVisible);
  };

  return (
    <div>
      {/* Main navbar container */}
      <div className="navbar w-full h-16 bg-blue-600 font-serif flex justify-center items-center mt-3">
      <p className='flex text-white'><TbCircleLetterC className='flex mt-1 mr-2 text-white' /> 2024 Employee Management System. Privacy Policy</p>
        <ul  className="flex flex-col gap-4 p-4 bg-blue-600 text-white font-serif text-center underline underline-offset-2">
          <li>
            <Link to="/login">Admin Login</Link>
          </li>
        </ul>
      </div>

      {/* Mobile menu items */}
      {isMobileMenuVisible && (
        <div className="md:hidden">
          <ul className="flex flex-col gap-4 bg-blue-600 text-white font-serif text-center">
            <li>
              <Link to="/emplogin">Admin Login</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Footer;
