import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import {MultiSelect} from "react-multi-select-component";
import NavbarTutor from './NavbarTutor';
import axios from 'axios';


function ProfileTestTutor() {
  
  const options = [
    { label: "05/06/23 4:00 PM", value:"2023-05-06-17:00:00", valueDay: "2023-05-06", valueTime: "17:00:00" },
    { label: "05/06/23 5:00 PM", value:"2023-05-06-18:00:00", valueDay: "2023-05-06", valueTime: "18:00:00"},
    { label: "05/06/23 6:00 PM", value:"2023-05-06-19:00:00", valueDay: "2023-05-06", valueTime: "19:00:00" },
    { label: "05/06/23 7:00 PM", value:"2023-05-06-20:00:00", valueDay: "2023-05-06", valueTime: "20:00:00" },
    { label: "05/07/23 4:00 PM", value:"2023-05-07-17:00:00", valueDay: "2023-05-07", valueTime: "17:00:00" },
    { label: "05/07/23 5:00 PM", value:"2023-05-07-18:00:00", valueDay: "2023-05-07", valueTime: "18:00:00"},
    { label: "05/07/23 6:00 PM", value:"2023-05-07-19:00:00", valueDay: "2023-05-07", valueTime: "19:00:00" },
    { label: "05/07/23 7:00 PM", value:"2023-05-07-20:00:00", valueDay: "2023-05-07", valueTime: "20:00:00" },
    { label: "05/08/23 4:00 PM", value:"2023-05-08-17:00:00", valueDay: "2023-05-08", valueTime: "17:00:00" },
    { label: "05/08/23 5:00 PM", value:"2023-05-08-18:00:00", valueDay: "2023-05-08", valueTime: "18:00:00"},
    { label: "05/08/23 6:00 PM", value:"2023-05-08-19:00:00", valueDay: "2023-05-08", valueTime: "19:00:00" },
    { label: "05/08/23 7:00 PM", value:"2023-05-08-20:00:00", valueDay: "2023-05-08", valueTime: "20:00:00" },
  ];


  const [selected, setSelected] = useState([]);

  const [tutor, setTutor] = useState({
    profile_pic: '',
    name: '',
    about_me: '',
    email: '',
    subject: '',
    available_times: [],
  });

  const [tutorEdit, setTutorEdit] = useState({
    ...tutor
  });

  const id = localStorage.getItem("token");

  const submitEditForm = (e) => {
    e.preventDefault();
    setTutor({ ...tutorEdit })
    axios
      .put("http://127.0.0.1:8000/updatetutor/" + id, tutorEdit
      )
      .then(function (response) {
        console.log(response.data)
      }).catch(function (response) {
      })
  };

  const submitDayTimes = (e) => {
    axios
    .put("http://127.0.0.1:8000/updatetutor/" + id, {
      available_times: selected
    }).then(function (response) {
      console.log(response.data)
    }).catch(function (response) {
    })
  };

  const getTutor = (e) => {
    e.preventDefault();
    axios
      .get("http://127.0.0.1:8000/tutors/" + id,
      )
      .then(function (response) {
        setTutor({
          ...tutor,
          profile_pic: response.data["profile_pic"],
          name: response.data["name"],
          about_me: response.data["about_me"],
          date_of_birth: response.data["date_of_birth"],
          email: response.data["email"],
          subject: response.data["subject"],
          available_times: response.data["available_times"]
        })
        console.log(response.data)
      }).catch(function (response) {
      })
  };

  window.onpageshow = getTutor;

  setTimeout(() => {
    axios
      .get("http://127.0.0.1:8000/tutors/" + id,
      )
      .then(function (response) {
        setTutor({
          ...tutor,
          profile_pic: response.data["profile_pic"],
          name: response.data["name"],
          about_me: response.data["about_me"],
          date_of_birth: response.data["date_of_birth"],
          email: response.data["email"],
          subject: response.data["subject"]
        })
        console.log(response.data)
      }).catch(function (response) {
        alert()
      })
  }, "3000");

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div>
      <NavbarTutor />

      <div class="container">
        <div>
          <div class="row">
            <div class="col-4 col-6-medium col-12-small">
              <article class="box style2">
                <a class="image featured"><img src={ "/" + tutor.profile_pic} alt="Not visible" /></a>
                <h3>{tutor.name}</h3>
                <p>{tutor.email}</p>
                <p>{tutor.subject}</p>
                <p>{tutor.date_of_birth}</p>
                <p>About me: {tutor.about_me}</p>
              </article>
            </div>
            <div class="column" style={{ width: '50%' }}>
              <h1>Editing Profile</h1>
              <div >
                <form className='EditForm' onSubmit={handleSubmit}>
                  <div className='field1'>
                    <label> Name </label>
                    <input
                      placeholder={tutor.name}
                      type="text"
                      onChange={(e) => setTutorEdit({ ...tutorEdit, name: e.target.value })}
                    />
                    <label> Email </label>
                    <input
                      placeholder={tutor.email}
                      type="text"
                      onChange={(e) => setTutorEdit({ ...tutorEdit, email: e.target.value })}
                    />
                    <label> Subject </label>
                    <input list='subjects' name="subject" placeholder={tutor.subject}
                      onChange={(e) => setTutorEdit({ ...tutorEdit, subject: e.target.value })}
                    />
                    <datalist id="subjects" >
                      <option value="Mathematics" />
                      <option value="Physics" />
                      <option value="Geography" />
                      <option value="History" />
                      <option value="English" />
                    </datalist>
                    <label>
                      About me:
                      <textarea
                        placeholder={tutor.about_me}
                        value={tutorEdit.about_me}
                        onChange={(e) => setTutorEdit({ ...tutorEdit, about_me: e.target.value })} />
                    </label>
                  </div>
                  <button onClick={submitEditForm} type='submit' id="submitBtn" className='submitBtn' >Submit</button>

                </form>
                <h1>Select Available Times</h1>
                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                  />
                  <button onClick={submitDayTimes} type='submit' id='submitBtn' className='submitBtn'>Submit</button>
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


    </div >
  );
}
export default ProfileTestTutor;