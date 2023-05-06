import Table from "react-bootstrap/Table";
import "../src/assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import axios from "axios";


const TutorHomePage = () => {
  const id = localStorage.getItem("token");

  let currentDate = new Date().toJSON().slice(0, 10);
  let currentTime = new Date().toTimeString().slice(0,8);

  const [tutor, setTutor] = useState(
    axios.get("http://127.0.0.1:8000/tutors/" + id).then(function (response) {
      return {
        profile_pic: response.data["profile_pic"],
        name: response.data["name"],
        about_me: response.data["about_me"],
        date_of_birth: response.data["date_of_birth"],
        email: response.data["email"],
        subject: response.data["subject"],
        total_time: response.data["total_time"]
      };
    })
  );

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

  const [pastAppointments, setPastAppointments] = useState([
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

  const getTutor = (e) => {
    e.preventDefault();
    axios
      .get("http://127.0.0.1:8000/tutors/" + id)
      .then(function (response) {
        setTutor({
          ...tutor,
          profile_pic: response.data["profile_pic"],
          name: response.data["name"],
          about_me: response.data["about_me"],
          date_of_birth: response.data["date_of_birth"],
          email: response.data["email"],
          subject: response.data["subject"],
          total_time: response.data["total_time"],
        });
        console.log(response.data);
      })
      .catch(function (response) {
        alert();
      });
  };

  window.onpageshow = getTutor;

  setTimeout(() => {
    axios
        .get("http://127.0.0.1:8000/appointment")
        .then(function (response) {
            setUpcomingAppointments(response.data.filter((appointment) => {
                return appointment.tutor_info.tutor_email.includes(tutor.email)
            }).filter((appointment) => {
                return (appointment.date >= currentDate && appointment.time >= currentTime)
            }))
            setPastAppointments(response.data.filter((appointment) => {
                return appointment.tutor_info.tutor_email.includes(tutor.email)
            }).filter((appointment) => {
                return (appointment.date < currentDate ||
                     (appointment.date <= currentDate && appointment.time < currentTime ))
            }))
        }).catch(function (response) {
            alert()
        })
}, "3000");

  return (

    <div className="TutorHomePage">
      <div class="container-wide">
        <div class="row">
          <div class="col-4 col-6-medium col-12-small">
            <article class="box style2">
              <a class="image featured">
                <img
                  src={"/" + tutor.profile_pic}
                  width={60}
                  alt="Not visible"
                />
              </a>

              <h3>{tutor.name}</h3>
              <p>{tutor.email}</p>
              <p>{tutor.subject}</p>
              <p>{tutor.date_of_birth}</p>
              <p>About me: {tutor.about_me}</p>
              <p>Total Time Tutored: {tutor.total_time}</p>
            </article>
          </div>
          <div class="col-8 col-6-medium col-12-small">
            <p>Upcoming Appointment: </p>
            <article class="box style1">
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Student Info</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingAppointments.map((appointment) => {
                    return (
                      <tr>
                        <td>{appointment.student_info.student_name}</td>
                        <td>{appointment.time}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.subject}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </article>

            <p>Past Appointment: </p>
            <article class="box style1">
            <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Student Info</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {pastAppointments.map((appointment) => {
                    return (
                      <tr>
                        <td>{appointment.student_info.student_name}</td>
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

export default TutorHomePage;
