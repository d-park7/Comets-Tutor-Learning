//import React from 'react'
import "../src/assets/css/main.css";
import Table from "react-bootstrap/Table";
import axios from "axios";

// Imports for testing tutor
import React, { useState } from "react";
import FastAPIClient from "./client";
import config from "./config";

const client = new FastAPIClient(config);


const StudentHomepage = () => {
  const student_id = localStorage.getItem("token");

  const [student, setStudent] = useState(
    axios
      .get("http://127.0.0.1:8000/student/" + student_id,
      )
      .then (function (response) {
        return {
          profile_pic: response.data["profile_pic"],
          name: response.data["name"],
          date_of_birth: response.data["date_of_birth"],
          email: response.data["email"],
          favorites: response.data["favorites"],
          totalTime: response.data["total_time"]
        }
      })
  )


  // const [student, setStudent] = useState({
  //   profile_pic: "",
  //   name: "",
  //   date_of_birth: "",
  //   email: "",
  //   favorites: [],
  //   totalTime: "",
  // });

  const getStudent = (e) => {
    e.preventDefault();
    axios
      .get("http://127.0.0.1:8000/student/"+ student_id,)
      .then(function (response) {
        setStudent({
          ...student,
          profile_pic: response.data["profile_pic"],
          name: response.data["name"],
          favorites: response.data["favorites"],
          date_of_birth: response.data["date_of_birth"],
          email: response.data["email"],
          totalTime: response.data["total_time"]
        });
        console.log(response.data);
      })
      .catch(function (response) {
        alert();
      });
  };
  window.onload = getStudent;
  return (
    <div className="StudentHomepage">
      <div class="container-wide">
        <div class="row">
          <div class="col-4 col-6-medium col-12-small">
            <article class="box style1">
              <a class="image featured">
                <img src={student.profile_pic} alt="" />
              </a>
              <p>{student.name}</p>
              <p>{student.email}</p>
              <p>{student.date_of_birth}</p>
              <p>{student.favorites}</p>
              <p>{student.totalTime}</p>
            </article>
          </div>
          <div class="col-8 col-6-medium col-12-small">
            <p>Accepted Appointment: </p>
            <article class="box style1">
              {/* <BasicExample /> */}
            </article>

            <p>Denied Appointment: </p>
            <article class="box style1">
              {/* <BasicExample /> */}
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
