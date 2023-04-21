import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import {Routes , Route} from "react-router-dom" 

import HomePage from './homepage';
import LoginTest from './login';

function Navbar() {
	return (

		<div id="nav">
			<ul class="container" >
					<li><a href="#aboutUs">About Us</a></li>
					<li><a href="#tutorsPort">Tutors</a></li>
					<li><a href="#studentPort">Students</a></li>
					<li><a ><Link to="/login">Login</Link></a></li>
					<li><a ><Link to="/">Home</Link></a></li>
                    {/* <NavLink to="/login"/> */}
			</ul>
			<Routes>
				{/* <Route exact path="/login" element={<LoginTest />}></Route> */}
			</Routes>
       	</div>

	);
}


// <Link to="/about">About</Link>
export default Navbar;