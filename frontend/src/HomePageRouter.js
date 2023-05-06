import '../src/assets/css/main.css';
import React from 'react';

import HomePage from './homepage.js';
import Navbar from './navbar';


function HomePageApp() {

    return (
        <div>
            <Navbar/>
            <HomePage/>
        </div>
    )

}

export default HomePageApp