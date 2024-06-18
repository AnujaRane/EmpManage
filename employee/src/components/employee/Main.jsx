import React from 'react'
import img1 from '../../assets/image/notebook-428292_1920.jpg';
import Empnavbar from './Empnavbar';

const Main = () => {
  return (
    <div style={{backgroundImage: `url(${img1})`, backgroundSize: 'cover', width: '100%', height: '100vh'}}>
    <Empnavbar />
        <div className='flex-wrap text-black font-serif text-center pt-60'>
            <h1 className='text-5xl'>Employee Management System</h1>
            <p className='text-xl p-4'>Best all-in-one employee management app for mobile teams.</p>
            <button className='text-base bg-black text-white p-2 border-none shadow shadow-red-500 w-40'>Learn More</button>
        </div>
    </div>
  )
}

export default Main;