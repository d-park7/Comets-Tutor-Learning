import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from "react-router-dom" 
import { HashLink } from 'react-router-hash-link';


import HomePage from './homepage';
import LoginTest from './login';

function Navbar() {
	return (

		<div id="nav">
			<ul class="container" >
					<li><a><HashLink to="/#aboutUs">About Us</HashLink></a></li>
					<li><a><Link to="/tutor/">Tutors</Link></a></li>
					<li><a><Link to="/student/">Students</Link></a></li> {/* revert back to #student when done making studenthome page*/}
					<li><a><Link to="/login/">Login</Link></a></li>
					<li><a><Link to="/studentsignup">Student Signup</Link></a></li>
					<li><a><Link to="/">Home</Link></a></li>

					{/* Note: Tutor Signup does not show up on bar, looks hidden but not really */}
					<li><a><Link to="/tutor-signup/">Tutor Signup</Link></a></li>
					
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