import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';


  const StudentSignup = () => {
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    
    // LOGIN TEST (dev.to)
    const signup = () => {
      if ((name == "") & (password == "") & (email == "") & (dateOfBirth == "")) {
        return;
      } else {
        const form = new FormData();
        const student = {
            "profile_pic": "",
            "email": email,
            "name": name,
            "date_of_birth": dateOfBirth,
            "favorites": "",
            "total_time": 0,
            "hashed_password": password
        }
        axios
          .post("http://127.0.0.1:8000/createstudent", student,
            { headers: { 'content-type': 'application/json'} }
          )
          .then(function (response) {
            console.log(response.data)

            if (response.status == 200) {
              if (response.data.user == 1) {
              }
            }
              
          })
          .catch(function (response) {
            alert()
          })
          
        }
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      alert(`The email is: ${email}\nThe password is: ${password}\n${dateOfBirth}\n${name}\n`)
    }

    // skipping header for brevity
    return (
        <div>
          <Navbar/>
          <div class="form-box">
            <form className='LoginForm' onSubmit={handleSubmit}> 
              <label> Signup </label>
              <div className='field1'>
                <input 
                  placeholder='Full name'
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input 
                  placeholder='Email'
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                <input 
                  placeholder='Date of Birth'
                  type="date" 
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                <input 
                  placeholder='Password'
                  type="text" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              <button onClick={signup} type='submit' id="submitBtn" className='submitBtn' >Submit</button>
            </form>
          </div>
        </div>

      ); 
  } 
export default StudentSignup;