import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import {Routes , Route} from "react-router-dom" 



function NavbarTutor() {
	return (

		<div id="nav">
			<ul class="container" >

					<li><a><Link to="/tutor/">Home</Link></a></li>
                    <li><a><Link to="/tutor/editprofile">Edit Profile</Link></a></li>
                    {/* <NavLink to="/login"/> */}
			</ul>
			<Routes>
				{/* <Route exact path="/login" element={<LoginTest />}></Route> */}
			</Routes>
       	</div>

	);
}


// <Link to="/about">About</Link>
export default NavbarTutor;