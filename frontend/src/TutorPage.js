import React from 'react'
import Table from 'react-bootstrap/Table'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'

import NavbarTutor from './NavbarTutor';
import TutorHomepage from './TutorHome';

function TutorPage() {
    return (
        <div>
            <NavbarTutor/>
            <TutorHomepage/>
        </div>
    )
}

export default TutorPage;