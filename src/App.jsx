import React from 'react'
import { Routes, Route } from "react-router-dom";

import Navbar from './componet/Navbar'
import Page1 from './Pages/Page1'
import HomeB from './componet/HomeB'
import Page2 from './Pages/Page2'
import LoginPage from './Pages/LoginPage'
import Citizen from "./Pages/Citizen";
import CitizenLogin from './componet/CitizenLogin';
import CitizenRegister from "./componet/CitizenRegister";
import NGOLogin from './componet/NGOLogin';
import NGORegister from './componet/NGORegister';
import Page3 from './Pages/Page3';
import Report from './componet/Report'
import VolunteerLogin from './componet/VolunteerLogin';
import VolunteerRegister from './componet/VolunteerRegistration';
import CitizenDashboard from './componet/CItizenDashboard';
import NGODashboard from './componet/NGODashboard';
import VolunteerDashboard from './componet/VolunteerDashboard';
import Page4 from './Pages/Page4';
import Page5 from './Pages/Page5';
import Footer from './Pages/Footer';


// Your existing homepage components
const Home = () => {
  return (
    <>
      <Navbar />
      <Page1 />
      <HomeB />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Footer />
    </>
  )
}

const App = () => {
  return (
    <div className='min-h-screen w-full m-0 p-0 box-border'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/auth/citizen/login" element={<CitizenLogin />} />
        <Route path="/auth/citizen/register" element={<CitizenRegister />} />

        <Route path='/auth/Ngo/login' element={<NGOLogin />} />
        <Route path="/auth/ngo/register" element={<NGORegister />} />

        <Route path='/report' element={<Report />} />

        <Route path="/auth/volunteer/login" element={<VolunteerLogin />} />
        <Route path="/auth/volunteer/register" element={<VolunteerRegister />} />

        <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
        <Route path="/ngo/dashboard" element={<NGODashboard />} />
        <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
      </Routes>
    </div>
  )
}

export default App
