import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import DashboardHome from './components/DashboardHome';
import ManageEmp from './components/ManageEmp';
import EmpLogin from './components/employee/EmpLogin';
import Empheader from './components/Empheader';
import Footer from './components/Footer';
import EmpRegister from './components/employee/EmpRegister';
import Main from './components/employee/Main';
import { Hourglass } from 'react-loader-spinner';
import Empnavbar from './components/employee/Empnavbar';
import EmpDashboard from './components/employee/EmpDashboard';
import EmpMain from './components/employee/EmpMain';
import HRAddEmployee from './components/employee/HrAddEmp';
import AdminProfile from './components/AdminProfile';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000); // Example: Simulate a 3-second loading time
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
        />
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/admindashboard' element={<AdminDashboard />} />
          <Route path='/dashboardhome' element={<DashboardHome />} />
          <Route path='/manageemp' element={<ManageEmp />} />
          <Route path='/emplogin' element={<EmpLogin />} />
          <Route path='/empregister' element={<EmpRegister />} />
          <Route path='/empheader' element={<Empheader />} />
          <Route path='/footer' element={<Footer />} />
          <Route path='/main' element={<Main />} />
          <Route path='/empnavbar' element={<Empnavbar />} />
          <Route path='/empdashboard' element={<EmpDashboard />} />
          <Route path='/empmain' element={<EmpMain />} />
          <Route path='/hraddemp' element={<HRAddEmployee />} />
          <Route path='/adminprofile' element={<AdminProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
