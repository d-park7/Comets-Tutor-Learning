import '../src/assets/css/main.css';
import '../src/assets/css/studentsignup.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';


  const StudentSignup = () => {
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    // const [newStudent, setNewStudent] = useState({
    //         profile_pic: profilePicture, 
    //         email: email,
    //         name: name,
    //         date_of_birth: dateOfBirth,
    //         "favorites: [],
    //         "total_time": 0,
    //         "hashed_password": password
    // })
    
    const navigate = useNavigate()

    const signup = () => {
      if ((name == "") || (password == "") || (email == "") || (dateOfBirth == "")) {
        alert("Missing values: \nPlease fill out all fields.")
        return;
      } else {
        const student = {
            profile_pic: profilePicture, 
            email: email,
            name: name,
            date_of_birth: dateOfBirth,
            favorites: [],
            total_time: 0,
            hashed_password: password
        }
        axios
          .post("http://127.0.0.1:8000/createstudent/", student
          )
          .then(function (response) {
            console.log(response.data)

            if (response.status == 201) {
                navigate("/login")
            }
              
          })
          .catch(function (response) {
            alert()
          })
          
        }
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      alert(`The email is: ${email}\nThe password is: ${password}\n${dateOfBirth}\n${name}\n${profilePicture}`)
    }

    // skipping header for brevity
    return (
        <div>
          <Navbar/>
          <div class="container">
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
      
                    <h1>Select your profile picture</h1>
                    <div class="cc-selector">
                      <input 
                        id="amongus" 
                        type="radio" 
                        name="profilepic"
                        value="images/amongus.png" 
                        onClick={(e) => setProfilePicture("images/amongus.png")}
                        />
                      <label class="drinkcard-cc amongus" for="amongus"></label>
                      <input 
                        id="cathit" 
                        type="radio"
                        name="profilepic"
                        value="images/cathit.gif" 
                        onClick={(e) => setProfilePicture("images/cathit.gif")}
                        />
                      <label class="drinkcard-cc cathit" for="cathit"></label>
                      <input 
                        id="dancinglizard" 
                        type="radio"
                        name="profilepic"
                        value="images/dancing-lizard-lizard.gif" 
                        onClick={(e) => setProfilePicture("images/dancing-lizard-lizard.gif")}
                        />
                      <label class="drinkcard-cc dancinglizard" for="dancinglizard"></label>
                      <input 
                        id="test" 
                        type="radio"
                        name="profilepic"
                        value="images/test.png" 
                        onClick={(e) => setProfilePicture("images/test.png")}
                        />
                      <label class="drinkcard-cc test" for="test"></label>
                      <input 
                        id="sus" 
                        type="radio"
                        name="profilepic"
                        value="images/sus.png" 
                        onClick={() => setProfilePicture("images/sus.png")}
                        />
                      <label class="drinkcard-cc sus" for="sus"></label>
                  </div>

                </div>
                <button onClick={signup} type='submit' id="submitBtn" className='submitBtn' >Submit</button>
              </form>
            </div>
          </div> 
        </div>
      ); 
  } 
export default StudentSignup;