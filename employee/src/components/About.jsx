import React from 'react';
import Header from './Header';

const About = () => {
  return (
    <div>
      <Header />
      <div className="about-container max-w-screen-lg mx-auto mt-16 p-4 md:mt-40">
        <h1 className="text-center text-3xl md:text-4xl font-serif mb-6">About Us</h1>
        <h2 className="text-md md:text-lg mb-4 text-center">
          An Employee Management System (EMS) is a comprehensive solution designed to streamline various HR and administrative processes within an organization.
        </h2>
        <p className="text-base md:text-lg text-center mt-6 font-serif">
          An Employee Management System is a vital tool for modern organizations, enabling efficient management of HR processes and enhancing employee satisfaction. By automating routine tasks and providing valuable insights through analytics, an EMS helps organizations achieve better operational efficiency and maintain a productive workforce.
        </p>
        <div className="flex justify-center mt-10">
          <button className="shadow-lg shadow-blue-600 text-white bg-blue-500 p-3 font-serif text-lg">Read More</button>
        </div>
      </div>
    </div>
  );
}

export default About;
