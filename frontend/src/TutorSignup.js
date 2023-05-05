import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
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
                    navigate("/")
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
                    <p>Date of birth: (0000-00-00)</p>
                    <input 
                      type="text" 
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
                </div>
              <button onClick={submitSignupForm} type='submit' id="submitBtn" className='submitBtn' >Sign up!</button>
            </form>
          </div>
        </div>
      ); 
}

export default TutorSignup;