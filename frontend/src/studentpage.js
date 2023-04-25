import React from 'react'
import Table from 'react-bootstrap/Table'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'

import NavbarStudent from './navbarstudent';
import StudentHomepage from './StudentHome';
import EditProfile from './EditProfile';

function StudentPage() {
    return (
        // <BrowserRouter>        
        //     <Routes>
        //         <Route exact path="/" element={<StudentHomepage />}></Route>
        //         <Route exact path="/profile" element={<EditProfile />}></Route>
        
        //     </Routes>
        // </BrowserRouter>
        <div>
            <NavbarStudent/>
            <StudentHomepage/>
        </div>
    )
}

export default StudentPage;