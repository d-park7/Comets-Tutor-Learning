import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
//import {BrowserRouter as Routes, Route} from "react-router-dom";
import {Routes , Route } from "react-router-dom" 
import Student from "./models"

import LoginTest from './login';

import student1 from "./db.json";
import student2 from "./students.json"

// function Navbar() {
// 	return (
// 		<nav id="nav">
// 			<ul class="container" >
// 				<Routes>
// 					<li><a href="#aboutUs">About Us</a></li>
// 					<li><a href="#tutorsPort">Tutors</a></li>
// 					<li><a href="#studentPort">Students</a></li>
// 					<li><a href="#studentPort">Login</a></li>
// 				</Routes>
// 			</ul>
// 		</nav>
// 	);
// }

// <Link to="/about">About</Link>

// function renderStudent(student, index) {
// 	return (
// 		<tr key={index}>
// 			<td>{student.id}</td>
// 			<td>{student.email}</td>
// 			<td>{student.name}</td>
// 			<td>{student.date_of_birth}</td>
// 			<td>{student.total_time}</td>
// 			<td>{student.hashed_password}</td>
// 			<td>{student.favorites}</td>
// 		</tr>
// 	)
// }


function BasicExample() {
	const data = student2

	

	//student1 = new Student(student1.id, student1.email, student1.name, student1.date_of_birth, student1.total_time, student1.hashed_password, student1.favorites)
	return (
		
	  <Table responsive striped bordered hover>
		<thead>
		  <tr>
			<th>ID</th>
			<th>Email</th>
			<th>Date of Birth</th>
			<th>Total Time</th>
			<th>Hashed Password</th>
			<th>Favorites</th>
		  </tr>
		</thead>
		<tbody>
			{data.map(eachone => {return <tr><td>{eachone._id}</td><td>{eachone.email}</td><td>{eachone.date_of_birth}</td><td>{eachone.total_time}</td><td>{eachone.hashed_password}</td><td>{eachone.favorites}</td></tr>})}
			{/* {student1.map((student1) => renderStudent)}  */}
		</tbody>
	  </Table>
	);
  }
  

class HomePage extends React.Component {
	render () {
        return (
            <div>
			<article id="top" class="wrapper style1">
				<div class="container">
					<div class="row">
						<div class="col-4 col-5-large col-12-medium">
							<span class="image fit"><img src="images/CometsTutorLogo.jpg" alt="Team Logo" /></span>
						</div>
						<div class="col-8 col-7-large col-12-medium">
							<header>
								<h1>Hi. We are <strong>Group 3</strong>.</h1>
							</header>
							
						</div>
					</div>
				</div>
			</article>
		{/* <!-- Tutor Listing --> */}
		 	<article id="tutorsPort" class="wrapper style3">
			<BasicExample/>
			{console.log(Object.entries(student1))}
		 		<div class="container">
		 			<header>
		 				<h2>Here’s some of our tutors.</h2>
		 			</header>
		 			<div class="row">
		 				<div class="col-4 col-6-medium col-12-small">
		 					<article class="box style2">
		 						<a class="image featured"><img src="images/cathit.gif" alt="" /></a>
		 						<h3>STEM Cat</h3>
		 						<p>Math, Science</p>
		 						<p>About me: I am a cat, my head hurts.</p>
		 					</article>
		 				</div>
		 				<div class="col-4 col-6-medium col-12-small">
		 					<article class="box style2">
		 						<a class="image featured"><img src="images/amongus.png" alt="" /></a>
		 						<h3>Amongus</h3>
		 						<p>Organic Chemistry, Physical Chemistry, Psychology, Sussology, Instrumental Analysis</p>
		 						<p>About me: It was green.</p>
		 					</article>
		 				</div>
		 				<div class="col-4 col-6-medium col-12-small">
		 					<article class="box style2">
		 						<a class="image featured"><img src="images/dancing-lizard-lizard.gif" alt="" /></a>
		 						<h3>Geico</h3>
		 						<p>Ripping off students</p>
		 						<p>About me: Switching to GEICO can save 15% on your car insurance.</p>
		 					</article>
		 				</div>
		 				<div class="col-4 col-6-medium col-12-small">
		 					<article class="box style2">
		 						<a class="image featured"><img src="images/sus.png" alt="" /></a>
		 						<h3>Pepe</h3>
		 						<p>Physics</p>
		 						<p>About me: Physics may not actually be real</p>
		 					</article>
		 				</div>
						
						
		 			</div>
		 			<footer>
		 				<a href="#contact" class="button large scrolly">View other tutors</a>
		 			</footer>
		 		</div>
		 	</article>

		 	{/* // <!-- Students --> */}
		 	<article id="studentPort" class="wrapper style2">
		 		<div class="container">
		 			<div class="row aln-center">
		 				<img class="image left" style={{width:'25em', height:'25em'}} src="images/test.png" alt="" />
		 				<div class="col-4 col-6-medium col-12-small">
		 					<section class="box style1">
		 						<p>Who can be a student?</p>
		 						<p>Anyone from Kindergarten through High School</p>								
								<a href='http://localhost:3000/studentsignup'>Signup as a student here!</a>
		 					</section>
		 				</div>
		 			</div>
		 		</div>
		 	</article>
		

		 {/* // <!-- About Us --> */}
		 	<article id="aboutUs" class="wrapper style3">
		 		<div class="container">
		 			<p><b>This is a website for any student grades K-12 to connect to a UTD tutor for free.</b></p>
		 			<p><b>All tutors are verified to be currently or have been a UTD student.</b></p>
		 			<p><b>Any student will be able to find tutors for specific subjects and schedule an appointment with them.</b></p>
		 		</div>
		 	</article>
			

			
		 	<article id="contact" class="wrapper style4">
		 		<div class="container medium">
		 				<div class="col-12">
		 					<hr />
		 					<h3>Find us on ...</h3>
		 					<ul class="social">
		 						<li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
		 						<li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
		 						<li><a href="#" class="icon brands fa-linkedin-in"><span class="label">LinkedIn</span></a></li>
		 						<li><a href="#" class="icon brands fa-tumblr"><span class="label">Tumblr</span></a></li>
		 						<li><a href="#" class="icon brands fa-google-plus"><span class="label">Google+</span></a></li>
		 						<li><a href="#" class="icon brands fa-github"><span class="label">Github</span></a></li>
		 					</ul>
		 					<ul class="contact">
		 						<li><h4>UTD Phone: 972-883-2111</h4></li>
		 						<li><h4>The University of Texas at Dallas </h4></li>
		 						<li><h4>800 W. Campbell Road, </h4></li>
		 						<li><h4>Richardson, Texas 75080-3021</h4></li>
		 					</ul>	
		 					<hr />
		 				</div>
		 				<ul id="copyright">
		 					<li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
		 				</ul>
		 		</div>
		 	</article>
		 </div>
        )
	}

}
export default HomePage;