import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

import NavbarTutor from './NavbarTutor';
import config from './config';
import FastAPIClient from './client';
import { json } from 'react-router-dom';
import axios from 'axios';


const client = new FastAPIClient(config)


function ProfileTestTutor() {



  const [tutor, setTutor] = useState({
    profile_pic: '',
    name: '',
    about_me: '',
    email: '',
    subject: '',
  });

  const [tutorEdit, setTutorEdit] = useState({
    ...tutor
  });

  const id = localStorage.getItem("token");

  const submitEditForm = (e) => {
    // console.log(id);
    e.preventDefault();
    setTutor({ ...tutorEdit })
    axios
      .put("http://127.0.0.1:8000/updatetutor/" + id, tutorEdit
      )
      .then(function (response) {
        console.log(response.data)
      }).catch(function (response) {
        alert()
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
          subject: response.data["subject"]
        })
        console.log(response.data)
      }).catch(function (response) {
        alert()
      })
  };

  useEffect(() => {
    
  })

  

  // window.history.pushState(() => {
  //   getTutor
  // })

  window.onpageshow = getTutor;

  const handleSubmit = (event) => {
    event.preventDefault();
    //alert(`The name you entered was: ${name}\nThe email is: ${email}\nThe password is: ${password}`)
    alert(`The name is: ${tutor.name}`)
  }

  window.onloadstart = getTutor;

  return (
    <div>
      <NavbarTutor />
      
      {/* <h1> This is the Tutor profile edit page </h1> */}
      {/* <body onLoad={getTutor} /> */}
      <div class="container">
        <div>
          <div class="row">
            <div class="col-4 col-6-medium col-12-small">
              <article class="box style2">
                <p>{tutor.profile_pic}</p>
                <a class="image featured"><img src="images\cathit.gif" alt="" /></a>
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
                      // value={tutor.name}
                      onChange={(e) => setTutorEdit({ ...tutorEdit, name: e.target.value })}
                    />
                    <label> Email </label>
                    <input
                      placeholder={tutor.email}
                      type="text"
                      // value={tutor.email}
                      onChange={(e) => setTutorEdit({ ...tutorEdit, email: e.target.value })}
                    />
                    <label> subject </label>
                    <input list='subjects' name="subject" placeholder={tutor.subject}
                      // placeholder={tutor.email}
                      // type="text"
                      // value={tutor.email}
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
                  {/* <input type="submit" /> */}

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={getTutor}>Click here for tutor</button> */}
      {/* {JSON.stringify({...tutor})} */}
    </div >
  );
}
export default ProfileTestTutor;