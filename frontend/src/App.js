import '../src/assets/css/main.css';
import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'

import HomePage from './homepage.js';
import Navbar from './navbar';
import LoginTest from './login';


function App() {
    return (
        <BrowserRouter>        
            <Navbar/>
            <Routes>
                {/* <HomePage /> {/* comment out to switch pages*/ } 
                <Route exact path="/login" element={<LoginTest />}></Route>
                <Route exact path="/" element={<HomePage />}></Route>
                {/* <Route exact path="/About" element={<LoginTest />}></Route> */}
            </Routes>
        </BrowserRouter>
    )
}


export default App;
