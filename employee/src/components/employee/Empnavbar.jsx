import React from 'react'

const Empnavbar = () => {
  return (
    <div>
        <div className="navbar bg-black text-white font-serif h-10">
            <ul className="flex justify-center items-center gap-8 text-lg">
                <li className='hover:tracking-wide'><a href="/main">Home</a></li>
                <li className='hover:tracking-wide'><a href="/EmpDashboard">Dashboard</a></li>
                <li className='hover:tracking-wide'><a href="#/contact">Contact</a></li>
                <li className='hover:tracking-wide'><a href="/emplogin">Logout</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Empnavbar;