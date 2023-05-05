import '../src/assets/css/main.css';
import '../src/assets/css/studentsignup.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import {MultiSelect} from "react-multi-select-component";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from './navbar';

function TutorSignup() {

    const [newTutor, setNewTutor] = useState({
        profile_pic: '',
        about_me: '',
        email: null,
        name: null,
        date_of_birth: null,
        subject: '',
        total_time: 0,
        hashed_password: null,
        calendly_user: null,
        available_times: [],
    });

    const [finalTutor, setFinalTutor] = useState({
        ...newTutor
    });

    const navigate = useNavigate()

    const submitSignupForm = () => {
        setNewTutor({...finalTutor})
        axios
            .post("http://127.0.0.1:8000/create_tutor/", finalTutor
            )
            .then(function (response) {
                console.log(response.data)

                if (response.status == 201) {
                    navigate("/login/")
                }
            })
            .catch(function (response) {
                alert("A field was invalid. Please try again.")
            })
    };

    const handleSubmit = (event) => {
      console.log(event)
      event.preventDefault();
      alert(`You have registered successfully!`)
    }

    // skipping header for brevity
    return (
        <div>
          <Navbar/>
          <div class="form-box">
            <form className='TutorSignupForm' onSubmit={handleSubmit}> 
              <label> Tutor Signup Page </label>
                <div className='field1'>
                  <p>Calendly Username:</p>
                    <input 
                      type="text" 
                      onChange={ function (e) {
                                  if (e.target.value.match(/^[^ ]+$/)) {
                                    // NTS: check if .toLowerCase still needed
                                    return setFinalTutor({...finalTutor, calendly_user: e.target.value.toLowerCase()})
                                  }
                                  else {
                                    return setFinalTutor({...finalTutor, calendly_user: null})
                                  }
                                }
                      }
                    />
                    <p>Email:</p>
                    <input 
                      type="text" 
                      onChange={ function (e) {
                                  if (e.target.value.match(/(?=.*@)(?=.*\.)^[^ ]+$/)) {
                                    return setFinalTutor({...finalTutor, email: e.target.value.toLowerCase()})
                                  }
                                  else {
                                    return setFinalTutor({...finalTutor, email: null})
                                  }
                                }
                      }
                    />
                    <br></br>
                    <p>Password:</p>
                    <input 
                      type="text" 
                      onChange={ function (e) {
                                  if (e.target.value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])^[^ ]+$/)) {
                                    if (e.target.value.length >= 8) {
                                      return setFinalTutor({...finalTutor, hashed_password: e.target.value})
                                    }
                                  }
                                  else {
                                    return setFinalTutor({...finalTutor, hashed_password: null})
                                  }
                                }
                      }
                    />
                    <p><i>8 characters long (min.) and contain 1 uppercase, 1 lowercase, and 1 number</i></p>
                    <br></br>
                    <p>Name: (First and Last)</p>
                    <input 
                      type="text" 
                      onChange={(e) => setFinalTutor({...finalTutor, name: e.target.value})}
                    />
                    <br></br>
                    <p>Date of birth: </p>
                    <input 
                      type="date" 
                      onChange={(e) => setFinalTutor({...finalTutor, date_of_birth: e.target.value})}
                    />
                    <br></br>
                    <p>Subject to tutor: (Optional)</p>
                    <input 
                      list='subjects' 
                      name='subject'
                      type='text' 
                      placeholder='-- Choose a subject --'
                      onChange={(e) => setFinalTutor({...finalTutor, subject: e.target.value})}
                    />
                    <datalist id='subjects'>
                      <option value="Mathematics" />
                      <option value="Physics" />
                      <option value="Geography" />
                      <option value="History" />
                      <option value="English" />
                    </datalist>
                    <br></br>
                    <p>About me: (Optional)</p>
                    <input 
                      type="text" 
                      onChange={(e) => setFinalTutor({...finalTutor, about_me: e.target.value})}
                    />
                    <br></br>

                    <h1>Select your profile picture</h1>
                    <div class="cc-selector">
                      <input 
                        id="amongus" 
                        type="radio" 
                        name="profilepic"
                        value="images/amongus.png" 
                        onClick={(e) => setFinalTutor({...finalTutor, profile_pic: "images/amongus.png"})}
                        />
                      <label class="drinkcard-cc amongus" for="amongus"></label>
                      <input 
                        id="cathit" 
                        type="radio"
                        name="profilepic"
                        value="images/cathit.gif" 
                        onClick={(e) => setFinalTutor({...finalTutor, profile_pic: "images/cathit.gif"})}
                        />
                      <label class="drinkcard-cc cathit" for="cathit"></label>
                      <input 
                        id="dancinglizard" 
                        type="radio"
                        name="profilepic"
                        value="images/dancing-lizard-lizard.gif" 
                        onClick={(e) => setFinalTutor({...finalTutor, profile_pic: "images/dancing-lizard-lizard.gif"})}
                        />
                      <label class="drinkcard-cc dancinglizard" for="dancinglizard"></label>
                      <input 
                        id="test" 
                        type="radio"
                        name="profilepic"
                        value="images/test.png" 
                        onClick={(e) => setFinalTutor({...finalTutor, profile_pic: "images/test.png"})}
                        />
                      <label class="drinkcard-cc test" for="test"></label>
                      <input 
                        id="sus" 
                        type="radio"
                        name="profilepic"
                        value="images/sus.png" 
                        onClick={() => setFinalTutor({...finalTutor, profile_pic: "images/sus.png"})}
                        />
                      <label class="drinkcard-cc sus" for="sus"></label>
                  </div>

                    <br></br>
                </div>
              <button onClick={submitSignupForm} type='submit' id="submitBtn" className='submitBtn' >Sign up!</button>
            </form>
          </div>
        </div>
      ); 
}

export default TutorSignup;