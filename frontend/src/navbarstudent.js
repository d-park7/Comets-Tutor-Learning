import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';

function NavbarStudent() {
	
	function logout() {
		localStorage.removeItem("token");
	}

	return (
		<div id="nav">
			<ul class="container" >
				<li><a><Link to="/student/">Home</Link></a></li>
                <li><a><Link to="/student/editprofile">Edit Profile</Link></a></li>
				<li><a><Link to="/student/appointments">Sign up for Appointments </Link></a></li>
				<li><a><Link to="/" onClick={logout}>Logout</Link></a></li>
			</ul>
       	</div>

	);
}
export default NavbarStudent;