import "../src/assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import FastAPIClient from "./client";
import config from "./config";

import NavbarStudent from "./navbarstudent";

const client = new FastAPIClient(config);

function StudentAppointment() {
  // const [tutorList, setTutorList] = useState([{
  //   email: "",
  //   dob: "",
  //   totalTime: "",
  // }]);

  const [tutorList, setTutorList] = useState([]);




  const GetAppointmentTutors = () => {
    client.getTutors().then((data) => {
      setTutorList(data?.data);
      // setTutorList(data?.result);
      // console.log(data);
    });
    // return(
    //   <div>
    //     {JSON.stringify(tutorList)}
    //   </div>
    // );
  };

  return (
    <div>
      <NavbarStudent />
      <h1> This is the student appointment page </h1>

      <GetAppointmentTutors/>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Profile Picture</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {tutorList.map((eachone) => {
            return (
              <tr>
                <td>{eachone.name}</td>
                <td>{eachone.email}</td>
                <td>{eachone.profile_pic}</td>
                <td>{eachone.subject}</td>
              </tr>
            );
          })}
          {/* {student1.map((student1) => renderStudent)}  */}
      </tbody></Table>
    </div>
  );
}
export default StudentAppointment;
