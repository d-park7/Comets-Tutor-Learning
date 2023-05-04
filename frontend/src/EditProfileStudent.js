import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

import NavbarStudent from './navbarstudent';

import axios from 'axios';

function ProfileTestStudent() { 

    const [studentInfo, setStudentInfo] = useState({
       profile_pic: '',
       email: '',
       name: '',
       favorites: '',
    });

     const [studentEdit, setStudentEdit] = useState({
       ...studentInfo
     });

     const student_id = localStorage.getItem("token");

    //  const student_id = "6452d21375e19ec785dc1739";

     const submitEditForm = () => {
       setStudentInfo({...studentEdit})
       axios
        .put("http://127.0.0.1:8000/updatestudent/" + student_id, studentEdit
        )
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function(response){
          alert("ERROR!!")
        })
     };

    const getStudent = (e) => {
       e.preventDefault();
       axios
         .get("http://127.0.0.1:8000/student/" + student_id, 
         )
         .then (function (response) {
           console.log(response.data)
           setStudentInfo({
            ...studentInfo, 
            profile_pic: response.data["profile_pic"],
            email: response.data["email"],
            name: response.data["name"],
            favorites: response.data["favorites"],
          })
        })
        .catch(function (response) {
          alert("ERROR")
        })
    };

    window.onpageshow = getStudent;

    const handleSubmit = (event) => {
      event.preventDefault();
      alert(`You have updated your information!`)
    }

    window.onloadstart = getStudent;

    return ( 
       <div> 
          <NavbarStudent />

          {/* Main Page */}
          <article id="StudentHomepage" class="wrapper style3">
            <div class="container">

              <div class="row aln-center">
                {/* Profile Image */}
                <div class="col-4 col-6-medium col-12-small">
                  <article class="box style2">
                    <a class="image featured"><img src="images/cathit.gif" alt="" /></a>
                    <h3>Current Profile Picture</h3>
                  </article>
                  <br></br>
                </div>

                {/* Student Info */}
                {/* <div class="col-4 col-6-medium col-12-small">
                  <article class="box style2">
                    <h3>Student Info</h3>
                    <p>{studentInfo.name}</p>
                    <p>{studentInfo.email}</p>
                  </article>
                </div> */}

                {/* Favorites List */}
                {/* <div class="col-4 col-6-medium col-12-small">
                  <article class="box style2">
                    <h3>Favorites List</h3>
                    <p>{studentInfo.favorites}</p>
                  </article>
                </div> */}


              </div>

              {/* Edit Fields */}

              {/* NTS: Added .form-box-2 in CSS */}
              <div class="row aln-center">
              <div class="form-box-2">
                <form className='UpdateForm' onSubmit={handleSubmit}> 
                  <div className='field1'>
                    <h4>Name: {studentInfo.name}</h4>
                      <input 
                        placeholder='New Name'
                        type="text" 
                        onChange={(e) => setStudentEdit({...studentEdit, name: e.target.value})}
                      />
                    <br></br>
                    <h4>Email: {studentInfo.email}</h4>
                      <input 
                        placeholder='New Email'
                        type="text" 
                        onChange={(e) => setStudentEdit({...studentEdit, email: e.target.value})}
                      />
                    </div>
                    <br></br>
                    {/* Note: This is not correct, literally does nothing */}
                  <button onClick={submitEditForm} type='submit' id="updateBtn" className='updateBtn' >Update</button>
                </form>
              </div>
              </div>


            </div>
          </article>

          {/* Footer */}
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
    ); 
} 

export default ProfileTestStudent;