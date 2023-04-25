import '../src/assets/css/main.css';
import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'

import HomePage from './homepage.js';
import HomePageApp from './HomePageRouter.js';
import Navbar from './navbar';
import LoginTest from './login';
import StudentHomepage from './StudentHome';
import StudentPage from './studentpage';
import ProfileTest from './EditProfile';
import StudentAppointment from './StudentAppt';

import NavbarStudent from './navbarstudent';

function App() {
    return (
        <BrowserRouter>        
            {/* <Navbar/> */}
            <Routes>

                <Route exact path="/student/" element={<StudentPage />}></Route>
                <Route exact path="/student/editprofile" element={<ProfileTest/>}></Route>
                <Route exact path="/student/appointments" element={<StudentAppointment/>}></Route>
                <Route exact path="/login/" element={<LoginTest />}></Route>
                <Route exact path="/" element={<HomePageApp />}></Route>

            </Routes>
        </BrowserRouter>
    )
}


export default App;

