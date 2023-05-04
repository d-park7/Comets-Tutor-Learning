import "../src/assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import FastAPIClient from "./client";
import config from "./config";
import axios from 'axios';
import { PopupButton } from "react-calendly";


import NavbarStudent from "./navbarstudent";

const client = new FastAPIClient(config);

function StudentAppointment() {

  const [tutorList, setTutorList] = useState([]);
  const [filterText, setFilterText] = useState("");

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
  };

  window.onpageshow = getTutor;


  const filterButton = (e) => {
    // console.log(id);
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
      // setTutorList(tutorList.filter((each) =>
      // {return each.name.includes(filterText)}
      // ))
      console.log({tutorList})
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
                    url= {"https://calendly.com/"+eachone.calendly_user}
                    // url="https://calendly.com/"+{eachone.calendly_user}
                    rootElement={document.getElementById("root")}
                    text="Click here to schedule!"
                  />
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
