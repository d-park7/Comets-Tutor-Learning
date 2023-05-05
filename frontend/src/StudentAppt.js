import "../src/assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Table from "react-bootstrap/Table";
import FastAPIClient from "./client";
import config from "./config";
import axios from 'axios';
import { PopupButton } from "react-calendly";


import NavbarStudent from "./navbarstudent";
import { Button } from "bootstrap";

const client = new FastAPIClient(config);

function StudentAppointment() {

  const id = localStorage.getItem("token");
  let name = "";
  const [tutorList, setTutorList] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [favoriteTutors, setFavorites] = useState([]);
  const [tutorName, setTutorName] = useState("");

  const getTutor = (e) => {
    e.preventDefault();
    axios
      .get("http://127.0.0.1:8000/tutors",
      )
      .then(function (response) {
        setTutorList(response.data)
        console.log(response.data)
      }).catch(function (response) {
        alert()
      })
    axios
      .get("http://127.0.0.1:8000/student/" + id,
      ).then(function (response) {
        setFavorites(response.data["favorites"])
        // console.log(response.data["favorites"])
      }).then((function () {
        console.log(...favoriteTutors)
      }))
      .catch(function (response) {
        alert()
      })
  };

  setTimeout(() => {
    axios
      .get("http://127.0.0.1:8000/student/" + id,
      ).then(function (response) {
        setFavorites(response.data["favorites"])
      })
      .catch(function (response) {
        alert()
      })
  }, "5000");


  function submitClick(value) {
    axios
      .get("http://127.0.0.1:8000/student/" + id,
      ).then(function (response) {
         setFavorites(response.data["favorites"])
      })
      .catch(function (response) {
        alert()
      }).then(()=>{
        if(favoriteTutors.includes(value))
        {
          alert("Tutor is already a favorite one")
        }
        else {
          favoriteTutors.push(value)
          axios.put("http://127.0.0.1:8000/updatestudent/"+id,{
            favorites: favoriteTutors
          }).then(function (response) {
            console.log(response.data)
          }).catch(function (response) {
            alert()
          })
        }
      })

  }

  window.onpageshow = getTutor;


  const filterButton = (e) => {
    e.preventDefault();
    axios
      .get("http://127.0.0.1:8000/tutors",
      )
      .then(function (response) {
        setTutorList(response.data.filter((each) => {
          return (each.name.includes(filterText) ||
            each.subject.includes(filterText))
        }))
      }).catch(function (response) {
        alert()
      })
    console.log({ tutorList })
  };

  return (
    <div>
      <NavbarStudent />
      <h1> This is the student appointment page </h1>

      {/* <GetAppointmentTutors /> */}
      <form className="form-app-sign-up">
        <div className='field1'>
          <input
            placeholder="Filter by Name or Subject"
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <button
            onClick={filterButton}
            type='submit'
            id="filterBtn"
            className='filterBtn' >
            Filter
          </button>
        </div>
      </form>

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Create Appointment</th>
            <th>Add To Favorites</th>
          </tr>
        </thead>
        <tbody>
          {/* {JSON.stringify(tutorList)} */}
          {tutorList.map((eachone) => {
            return (
              <tr>
                <td>{eachone.name}</td>
                <td>{eachone.email}</td>
                <td>{eachone.subject}</td>
                <td>
                  <PopupButton
                    url={"https://calendly.com/" + eachone.calendly_user}
                    // url="https://calendly.com/"+{eachone.calendly_user}
                    rootElement={document.getElementById("root")}
                    text="Click here to schedule!"
                  />
                </td>
                <td>
                  <AiFillPlusCircle
                    onClick={() =>
                      submitClick(eachone.name)
                    }
                  />
                  {/* <button onClick={setTutorName(eachone.name)}>
                  </button> */}
                </td>
              </tr>
            );
          })}
          {/* {student1.map((student1) => renderStudent)}  */}
        </tbody></Table>
    </div>
  );
}
export default StudentAppointment;
