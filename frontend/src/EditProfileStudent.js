import "../src/assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import NavbarStudent from "./navbarstudent";
import axios from "axios";

function ProfileTestStudent() {
  const [studentInfo, setStudentInfo] = useState({
    profile_pic: "",
    email: "",
    name: "",
    favorites: [],
    total_time: "0",
  });

  const [studentEdit, setStudentEdit] = useState({
    ...studentInfo,
  });

  const student_id = localStorage.getItem("token");

  const submitEditForm = () => {
    setStudentInfo({ ...studentEdit });
    axios
      .put("http://127.0.0.1:8000/updatestudent/" + student_id, studentEdit)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (response) {
        alert("Invalid form entry. Please try again.");
      });
  };

  const getStudent = (e) => {
    e.preventDefault();
    axios
      .get("http://127.0.0.1:8000/student/" + student_id)
      .then(function (response) {
        console.log(response.data);
        setStudentInfo({
          ...studentInfo,
          profile_pic: response.data["profile_pic"],
          email: response.data["email"],
          name: response.data["name"],
          favorites: response.data["favorites"],
        });
      })
      .catch(function (response) {
        alert("ERROR");
      });
  };

  window.onpageshow = getStudent;

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`You have updated your information!`);
  };

  window.onloadstart = getStudent;

  return (
    <div>
      <NavbarStudent />
      <div class="container">
        <div>
          <div class="row">
            <div class="col-4 col-6-medium col-12-small">
              <article class="box style2">
                <a class="image featured">
                  <img src={"/" + studentInfo.profile_pic} alt="Not visible" />
                </a>
                <h3>{studentInfo.name}</h3>
                <p>{studentInfo.email}</p>
                <p>{studentInfo.date_of_birth}</p>
              </article>
            </div>
            <div class="column" style={{ width: "50%" }}>
              <h1>Editing Profile</h1>
              <div>
                <form className="EditForm" onSubmit={handleSubmit}>
                  <div className="field1">
                    <label> Name </label>
                    <input
                      placeholder={studentInfo.name}
                      type="text"
                      onChange={(e) =>
                        setStudentEdit({ ...studentEdit, name: e.target.value })
                      }
                    />
                    <label> Email </label>
                    <input
                      placeholder={studentInfo.email}
                      type="text"
                      onChange={(e) =>
                        setStudentEdit({
                          ...studentEdit,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    onClick={submitEditForm}
                    type="submit"
                    id="submitBtn"
                    className="submitBtn"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
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
}

export default ProfileTestStudent;
