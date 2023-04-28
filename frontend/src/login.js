import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import FastAPIClient from './client';
import config from './config';
import Student from "./models"

import Navbar from './navbar';
import student1 from "./db.json";
import student2 from "./students.json"


  const LoginTest = () => {
    // const [error, setError] = useState({ email: '', password: '', fullName: '' });
    // const [registerForm, setRegisterForm] = useState({ email: '', password: '', fullName: "" });  // 1
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [loading, setLoading] = useState(false)
    const navigate = useNavigate()  // 2

    // const onRegister = (e) => {
    //   e.preventDefault();
    //   setLoading(true)
    //   setError(false);
      
    // }
    
    const handleSubmit = (event) => {
      event.preventDefault();
      alert(`The name you entered was: ${name}\nThe email is: ${email}\nThe password is: ${password}`)
    }

    // skipping header for brevity
    return (
        <div>
          <Navbar/>
          <div class="form-box">
            <form className='LoginForm' onSubmit={handleSubmit}> 
              <label> Login </label>
              <div className='field1'>
                <input 
                  placeholder='Name'
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                  placeholder='Password'
                  type="text" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              <button type='submit' id="submitBtn" className='submitBtn' >Submit</button>
              {/* <input type="submit" /> */}
              
            </form>
          </div>

                        {/* <Button title={"Create Account"} error={error.password} loading={loading} />        */}
        </div>

      ); 
  } 

export default LoginTest;