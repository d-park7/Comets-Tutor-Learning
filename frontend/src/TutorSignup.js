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
        email: '',
        name: '',
        date_of_birth: '',
        subject: '',
        total_time: 0,
        hashed_password: '',
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
                    <input 
                    placeholder='Email'
                    type="text" 
                    onChange={(e) => setFinalTutor({...finalTutor, email: e.target.value})}
                    />
                    <br></br>
                    <input 
                    placeholder='Password'
                    type="text" 
                    onChange={(e) => setFinalTutor({...finalTutor, hashed_password: e.target.value})}
                    />
                    <br></br>
                    <input 
                    placeholder='Name (First and Last)'
                    type="text" 
                    onChange={(e) => setFinalTutor({...finalTutor, name: e.target.value})}
                    />
                    <br></br>
                    <input 
                    placeholder='Date of birth (0000-00-00)'
                    type="text" 
                    onChange={(e) => setFinalTutor({...finalTutor, date_of_birth: e.target.value})}
                    />
                    <br></br>
                    <input 
                    placeholder='Subject Tutor (Optional)'
                    type="text" 
                    onChange={(e) => setFinalTutor({...finalTutor, subject: e.target.value})}
                    />
                    <br></br>
                    <input 
                    placeholder='About Me (Optional)'
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