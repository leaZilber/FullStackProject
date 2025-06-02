import { Route,Routes } from 'react-router-dom'
import './App.css'
import { PersonalArea } from './components/personalArea'
import { HomePage } from './components/homePage'
import { InformationPage } from './components/information'
import { AboutUs } from './components/aboutUs'
import LoginComp from './components/homeComponents/login'
import RegisterComp from './components/homeComponents/register'
import React from 'react'
import './index.css'
import './components/mainPage.css'
// import SchedulePage from './components/schedule'
// import { CheckPicture } from './components/checkPictu'
// import  Appointments  from './components/appointments'
// import MedicalHistory from './components/medicalHistory'

function App() {
  return (
    // <SchedulePage/>
    // <Appointments/>
    // <MedicalHistory/>
    // <PersonalArea />
    // <CheckPicture/>
    // <SchedulePage/>
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/informationArea" element={<InformationPage />} />
        {/* <Router path="/Schedule" element={<SchedulePage/>}/> */}
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/login" element={<LoginComp />} />
        <Route path="/register" element={<RegisterComp />} />
        <Route path='/personalArea' element={<PersonalArea />} />
        <Route path="*" element={<HomePage />} />
      </Routes> 
  )
}

export default App
