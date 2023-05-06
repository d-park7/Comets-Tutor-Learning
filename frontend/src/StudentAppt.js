import "../src/assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Select from "react-select";
import NavbarStudent from "./navbarstudent";

function StudentAppointment() {
  const id = localStorage.getItem("token");
  const [tutorList, setTutorList] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [favoriteTutors, setFavorites] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    student_name: "",
    student_email: "",
    total_time: ""
  });
  const [apptSelectedOption, setApptselectedOption] = useState(null);

  const getTutor = (e) => {
    e.preventDefault();
    axios
      .get("http://127.0.0.1:8000/tutors")
      .then(function (response) {
        setTutorList(response.data);
        console.log(response.data);
      })
      .catch(function (response) {
      });
    axios
      .get("http://127.0.0.1:8000/student/" + id)
      .then(function (response) {
        setFavorites(response.data["favorites"]);
        setStudentInfo(...{
          student_name: response.data["name"],
          student_email: response.data["email"],
          total_time: response.data["total_time"]
        });
      })
      .then(function () {
        console.log(...favoriteTutors);
      })
      .catch(function (response) {
      });
  };

  function submitAppointment(value) {
    console.log(value);
    axios
      .post("http://127.0.0.1:8000/createappointment", {
        tutor_info: {
          tutor_name: value.name,
          tutor_email: value.email,
        },
        student_info: studentInfo,
        time: apptSelectedOption.valueTime,
        date: apptSelectedOption.valueDay,
        subject: value.subject,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (response) {
      })
      .then(() => {
        axios
          .put("http://127.0.0.1:8000/updatetutor/" + value._id, {
            available_times: value.available_times.filter((time) => {
              return !time.label.includes(apptSelectedOption.label);
            }),
            total_time: value.total_time + 1
          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (response) {
          });
      })
      .then(() => {
        axios
          .put("http://127.0.0.1:8000/updatestudent/" + id, {
            total_time: studentInfo.total_time + 1
          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (response) {
          });
      })
  }

  setTimeout(() => {
    axios
      .get("http://127.0.0.1:8000/student/" + id)
      .then(function (response) {
        setFavorites(response.data["favorites"]);
        setStudentInfo({
          student_name: response.data["name"],
          student_email: response.data["email"],
          total_time: response.data["total_time"]
        });
      })
      .catch(function (response) {
      });
  }, "10000");

  function submitClick(value) {
    axios
      .get("http://127.0.0.1:8000/student/" + id)
      .then(function (response) {
        setFavorites(response.data["favorites"]);
      })
      .catch(function (response) {
      })
      .then(() => {
        if (favoriteTutors.includes(value)) {
          alert("Tutor is already a favorite one");
        } else {
          favoriteTutors.push(value);
          axios
            .put("http://127.0.0.1:8000/updatestudent/" + id, {
              favorites: favoriteTutors,
            })
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (response) {
            });
        }
      });
  }

  function submitMinusClick(value) {
    axios
      .get("http//127.0.0.1:8000/student/" + id)
      .then(function (response) {
        setFavorites(response.data["favorites"]);
      })
      .catch(function (response) {})
      .then(() => {
        if (!favoriteTutors.includes(value)) {
          alert("Tutor is not a part of your favorites!");
        } else {
          favoriteTutors.pop(value);
          axios
            .put("http://127.0.0.1:8000/updatestudent/" + id, {
              favorites: favoriteTutors,
            })
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (response) {});
        }
      });
  }

  window.onpageshow = getTutor;

  const filterButton = (e) => {
    e.preventDefault();
    axios
      .get("http://127.0.0.1:8000/tutors")
      .then(function (response) {
        setTutorList(
          response.data.filter((each) => {
            return (
              each.name.includes(filterText) ||
              each.subject.includes(filterText)
            );
          })
        );
      })
      .catch(function (response) {
      });
    console.log({ tutorList });
  };

  return (
    <div>
      <NavbarStudent />
      <form className="form-app-sign-up">
        <div className="field1">
          <input
            placeholder="Filter by Name or Subject"
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <button
            onClick={filterButton}
            type="submit"
            id="filterBtn"
            className="filterBtn"
          >
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
          {tutorList.map((eachone) => {
            return (
              <tr>
                <td>{eachone.name}</td>
                <td>{eachone.email}</td>
                <td>{eachone.subject}</td>
                <td>
                  <Select
                    defaultValue={setApptselectedOption}
                    onChange={setApptselectedOption}
                    options={eachone.available_times}
                  />
                  <button onClick={() => submitAppointment(eachone)} />
                </td>
                <td>
                  <AiFillPlusCircle onClick={() => submitClick(eachone.name)} />
                  <AiFillMinusCircle
                    onClick={() => submitMinusClick(eachone.name)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default StudentAppointment;
