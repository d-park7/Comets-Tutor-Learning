import '../src/assets/css/main.css';
import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'


import HomePage from './homepage.js';
import Navbar from './navbar';


function HomePageApp() {

    return (
        <div>
            <Navbar/>
            <HomePage/>
            {/* <Route exact path="/" element={<HomePage />} /> */}
        </div>
    )

}

export default HomePageApp