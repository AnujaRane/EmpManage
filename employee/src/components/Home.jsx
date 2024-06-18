import React from 'react';
import img1 from '../assets/image/lego-2539844_1280-Photoroom.png';
import Empheader from './Empheader';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <Empheader />
      {/* Main container */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-10">
        {/* Content section */}
        <div className="w-full mt-8 md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-serif tracking-wide">
            Now Manage Employee Effectively<br /> With More Ease From Anywhere
          </h1>
          <p className="w-11/12 md:w-96 pt-6">
            An employee management system is a platform for efficiently managing employee data, processes, and HR tasks within an organization.
          </p>
          <button className="mt-4 bg-blue-600 p-2 w-48 md:w-60 text-white text-lg">
            Get Started
          </button>
        </div>
        {/* Image section */}
        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img src={img1} alt="not found" className="max-w-full h-auto" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
