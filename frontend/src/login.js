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
    // const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const [conditions, setConditions] = useState({status: 404, accountType: 2});



    // const [state, updateState] = useReducer(
    //   (state, updates) => ({ ...state, ...updates }),
    //   initialState
    // );
    const navigate = useNavigate()  // 2

    //   setLoading(true)
    //   setError(false);
      
    // }
    
    // GOES INTO CLIENT.JS OR A NEW FILE AUTH.JS
    const setToken = (token) => {
      localStorage.setItem('token', token)
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
          .then(function (response) {
            console.log(response.data)
            

            if (response.status == 200) {
              setToken(response.data.access_token)
              if (response.data.user == 1) {
                // localStorage.setItem("token", response.data.access_token)
                setToken(response.data.access_token)
                navigate("/tutor")
              } else if (response.data.user == 0) {
                navigate("/student")
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
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
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