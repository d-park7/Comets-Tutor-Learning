import '../src/assets/css/main.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePageApp from './HomePageRouter.js';
import LoginTest from './login';
import StudentPage from './studentpage';
import ProfileTestStudent from './EditProfileStudent';
import ProfileTestTutor from './EditProfileTutor'
import StudentAppointment from './StudentAppt';
import TutorPage from './TutorPage';
import TutorSignup from './TutorSignup.js';
import StudentSignup from './StudentSignup';

function App() {
    return (
        <BrowserRouter>        
            <Routes>
                <Route exact path="/tutor//*" element={<TutorPage />}></Route>
                <Route exact path="/tutor/editprofile" element={<ProfileTestTutor/>}></Route>
                <Route exact path="/tutor-signup/" element={<TutorSignup />}></Route>
                <Route exact path="/studentsignup" element={<StudentSignup/>}></Route>
                <Route exact path="/student/" element={<StudentPage />}></Route>
                <Route exact path="/student/editprofile" element={<ProfileTestStudent/>}></Route>
                <Route exact path="/student/appointments" element={<StudentAppointment/>}></Route>
                <Route exact path="/login/*" element={<LoginTest />}></Route>
                <Route exact path="/" element={<HomePageApp />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;