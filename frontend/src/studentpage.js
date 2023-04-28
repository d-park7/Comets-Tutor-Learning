import React from 'react'
import Table from 'react-bootstrap/Table'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'

import NavbarStudent from './navbarstudent';
import StudentHomepage from './StudentHome';
import EditProfileStudent from './EditProfileStudent';

function StudentPage() {
    return (
        <div>
            <NavbarStudent/>
            <StudentHomepage/>
        </div>
    )
}

export default StudentPage;