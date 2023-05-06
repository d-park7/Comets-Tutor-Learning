import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';

  const LoginTest = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()  
    
    const setToken = (token) => {
      localStorage.setItem('token', token)
    }
    
    const login = () => {
      if ((username == "") & (password == "")) {
        return;
      } else {
        const form = new FormData();
        form.append('username', username)
        form.append('password', password)
        axios
          .post("http://127.0.0.1:8000/token", form,
            { headers: { 'Content-Type': 'multipart/form-data' }}
          )
          .then(function (response) {
            console.log(response.data)

            if (response.status == 200) {
              setToken(response.data.access_token)
              if (response.data.user == 1) {
                navigate("/tutor")
              } else if (response.data.user == 0) {
                navigate("/student")
              }
            }
          })
          .catch(function (response) {
          })
        }
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      alert(`The email is: ${username}\nThe password is: ${password}`)
    }

    return (
        <div>
          <Navbar/>
          <div class="form-box">
            <form className='LoginForm' onSubmit={handleSubmit}> 
              <label> Login </label>
              <div className='field1'>
                <input 
                  placeholder='Email'
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                />
                <input 
                  placeholder='Password'
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              <button onClick={login} type='submit' id="submitBtn" className='submitBtn' >Submit</button>
            </form>
          </div>
        </div>

      ); 
  } 
export default LoginTest;