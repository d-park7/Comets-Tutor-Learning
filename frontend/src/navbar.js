import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Navbar() {
	return (

		<div id="nav">
			<ul class="container" >
				<li><a><Link to="/">Home</Link></a></li>
				<li><a><HashLink to="/#aboutUs">About Us</HashLink></a></li>
				<li><a><Link to="/login/">Login</Link></a></li>
				<li><a><Link to="/studentsignup">Student Signup</Link></a></li>
				<li><a><Link to="/tutor-signup/">Tutor Signup</Link></a></li>		
			</ul>
       	</div>

	);
}
export default Navbar;