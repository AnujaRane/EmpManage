import React, { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`h-screen w-64 bg-gray-800 text-white ${isOpen ? 'block' : 'hidden'} sm:block`}>
        <ul>
        <li className="pt-20 ml-20 text-lg font-serif hover:tracking-wider"><a href="/empmain">Dashboard</a></li>
          <li className="pt-10 ml-20 text-lg font-serif hover:tracking-wider"><a href="#/profile">Profile</a></li>
          <li className="pt-10 ml-20 text-lg font-serif hover:tracking-wider"><a href="#/setting">Settings</a></li>
          <li className="pt-10 ml-20 text-lg font-serif hover:tracking-wider"><a href="/emplogin">Logout</a></li>
        </ul>
      </div>
      <button
        className="sm:hidden p-4 bg-gray-800 text-white fixed top-0 left-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ImCross /> : <FaBars />
        }
      </button>
    </>
  );
};

export default Sidebar;
