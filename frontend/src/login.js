import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs'

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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [loading, setLoading] = useState(false)
    const navigate = useNavigate()  // 2

    // const onRegister = (e) => {
    //   e.preventDefault();
    //   setLoading(true)
    //   setError(false);
      
    // }
    
    // GOES INTO CLIENT.JS OR A NEW FILE AUTH.JS
    const setToken = (token) => {
      localStorage.setItme('token', token)
    }
    const fetchToken = (token) => {
      return localStorage.getItem('token')
    }
    
    // LOGIN TEST (dev.to)
    const login = () => {
      if ((username == "") & (password == "")) {
        return;
      } else {
        const form = new FormData();
        form.append('username', username)
        form.append('password', password)
        // const data = {
        //   grant_type:'',
        //   username: username,
        //   password: password,
        //   scope:'',
        //   client_id:'', 
        //   client_secret:'' }
        axios
          .post("http://127.0.0.1:8000/token", form,
            // data
            //
            { headers: { 'Content-Type': 'multipart/form-data' }}
            //headers: { 'content-type': 'application/x-www-form-urlencoded'},
            //data: qs.stringify(data)
          )
          // .then(function (response) {
          //   console.log(response.data.token, "response.data.token");
          //   if (response.data.token) {
          //     setToken(response.data.token);
          //   }
          // })
          // .catch(function (error) {
          //   console.log(error, "error");
          // });
        }
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      //alert(`The name you entered was: ${name}\nThe email is: ${email}\nThe password is: ${password}`)
      alert(`The email is: ${username}\nThe password is: ${password}`)
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
                  placeholder='Username'
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                  placeholder='Password'
                  type="text" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              <button onClick={login} type='submit' id="submitBtn" className='submitBtn' >Submit</button>
              {/* <input type="submit" /> */}
              
            </form>
          </div>
            <div>{fetchToken() ? (
              <p>you are logged in</p>
            ) : (
              <p>you are not logged in</p>
            )}
            </div>
                        {/* <Button title={"Create Account"} error={error.password} loading={loading} />        */}
        </div>

      ); 
  } 

export default LoginTest;