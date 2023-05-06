//import React from 'react'
import "../src/assets/css/main.css";
import Table from "react-bootstrap/Table";
import axios from "axios";

// Imports for testing tutor
import React, { useState } from "react";


const StudentHomepage = () => {
  const student_id = localStorage.getItem("token");

  let currentDate = new Date().toJSON().slice(0, 10);
  let currentTime = new Date().toTimeString().slice(0,8);

  const [student, setStudent] = useState({
          profile_pic: "",
          name: "",
          date_of_birth: "",
          email: "",
          favorites: [],
          totalTime: ""
        }
  )
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      _id: "",
      tutor_info: {
        tutor_name: "",
        tutor_email: "",
      },
      student_info: {
        student_name: "",
        student_email: "",
      },
      time: "",
      date: "",
      subject: "",
    },
  ]);


  const getStudent = (e) => {
    e.preventDefault();
    axios
      .get("http://127.0.0.1:8000/student/"+ student_id,)
      .then(function (response) {
        setStudent({
          ...student,
          profile_pic: response.data["profile_pic"],
          name: response.data["name"],
          favorites: response.data["favorites" ],
          date_of_birth: response.data["date_of_birth"],
          email: response.data["email"],
          totalTime: response.data["total_time"]
        });
        console.log(response.data);
      })
      .catch(function (response) {
      });
  };

  setTimeout(() => {
    axios
      .get("http://127.0.0.1:8000/appointment")
      .then(function (response) {
        setUpcomingAppointments(
          response.data.filter((appointment) => {
            return appointment.student_info.student_email.includes(student.email)
          }).filter((appointment) => {
            return (appointment.date >= currentDate && appointment.time >= currentTime)
          }));
      })
      .catch(function (response) {
      });
  }, "3000");

  window.onload = getStudent;

  return (
    <div className="StudentHomepage">
      <div class="container-wide">
        <div class="row">
          <div class="col-4 col-6-medium col-12-small">
            <article class="box style1">
              <a class="image featured">
                <img src={ "/" + student.profile_pic} alt="" />
              </a>
              <p>Name: {student.name}</p>
              <p>Email: {student.email}</p>
              <p>Date of Birth: {student.date_of_birth}</p>
              <p>Total Time Tutored: {student.totalTime}</p>
              <p >Favorites:</p>
                {student.favorites.map((element) => {
                    return <p className="favorite-tutors">{element}</p>
                })}
            </article>
          </div>
          <div class="col-8 col-6-medium col-12-small">
            <p>Upcoming Appointment </p>
            <article class="box style1">
            <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Tutor Info</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingAppointments.map((appointment) => {
                    return (
                      <tr>
                        <td>{appointment.tutor_info.tutor_name}</td>
                        <td>{appointment.time}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.subject}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </article>
          </div>
        </div>
      </div>

      <article id="contact" class="wrapper style4">
        <div class="container medium">
          <div class="col-12">
            <hr />
            <h3>Find us on ...</h3>
            <ul class="social">
              <li>
                <a href="#" class="icon brands fa-twitter">
                  <span class="label">Twitter</span>
                </a>
              </li>
              <li>
                <a href="#" class="icon brands fa-facebook-f">
                  <span class="label">Facebook</span>
                </a>
              </li>
              <li>
                <a href="#" class="icon brands fa-linkedin-in">
                  <span class="label">LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="#" class="icon brands fa-tumblr">
                  <span class="label">Tumblr</span>
                </a>
              </li>
              <li>
                <a href="#" class="icon brands fa-google-plus">
                  <span class="label">Google+</span>
                </a>
              </li>
              <li>
                <a href="#" class="icon brands fa-github">
                  <span class="label">Github</span>
                </a>
              </li>
            </ul>
            <ul class="contact">
              <li>
                <h4>UTD Phone: 972-883-2111</h4>
              </li>
              <li>
                <h4>The University of Texas at Dallas </h4>
              </li>
              <li>
                <h4>800 W. Campbell Road, </h4>
              </li>
              <li>
                <h4>Richardson, Texas 75080-3021</h4>
              </li>
            </ul>
            <hr />
          </div>
          <ul id="copyright">
            <li>&copy; Untitled. All rights reserved.</li>
            <li>
              Design: <a href="http://html5up.net">HTML5 UP</a>
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
};

export default StudentHomepage;
