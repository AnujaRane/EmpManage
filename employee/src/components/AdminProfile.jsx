import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { FaUsers } from 'react-icons/fa6';

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch admin profile from backend API
    axios.get('http://localhost:8080/admin/profile', { withCredentials: true })
      .then(res => {
        if (res.data) {
          setProfile(res.data);
        } else {
          setIsNew(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setError(err.response ? err.response.data : 'Server error');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNew) {
      // Insert new admin profile
      axios.post('http://localhost:8080/admin', profile)
        .then(res => {
          setSuccess(res.data.message);
          setError(null);
          setIsNew(false);
        })
        .catch(err => {
          console.error('Error inserting profile:', err);
          setError(err.response ? err.response.data : 'Server error');
          setSuccess(null);
        });
    } else {
      // Update existing admin profile
      axios.put('http://localhost:8080/admin/profile', profile, { withCredentials: true })
        .then(res => {
          setSuccess(res.data.message);
          setError(null);
        })
        .catch(err => {
          console.error('Error updating profile:', err);
          setError(err.response ? err.response.data : 'Server error');
          setSuccess(null);
        });
    }
  };
  const handleBack = () => {
   navigate('/adminprofile');
   setIsNew(!isNew); // Toggle isNew state
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="main-container lg:max-w-[1210px] mx-auto lg:ml-80 h-20 border-b-2 border-indigo-600 font-serif">
        <div className="flex justify-center lg:justify-center">
          <h1 className="text-center text-3xl font-sans font-bold p-4 flex items-center bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">
            <FaUsers className="text-blue-800 mr-4" /> Manage Employee
          </h1>
        </div>

        {/* Add employee button */}
      <h1 className="text-2xl font-bold mb-4 ml-20 mt-10 text-blue-900 underline underline-offset-4 tracking-tight">Admin Profile</h1>
      {success && <div className="text-green-500 mb-4">{success}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className='ml-20'>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-96 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-96 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            className="w-96 p-2 border border-gray-300 rounded"
            placeholder="Leave blank to keep current password"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {isNew ? 'Insert Profile' : 'Update Profile'}
        </button>
        <button type="button" onClick={handleBack} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4">
          Back
        </button>
      </form>
      </div>
       {/* Admin Dashboard Component */}
       <div className="container flex mr-20 -ml-3.5 -mt-24">
        <AdminDashboard />
      </div>
      </div>
  );
};

export default AdminProfile;
