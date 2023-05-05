import { useCalendlyEventListener, InlineWidget } from 'react-calendly';
import { PopupButton } from "react-calendly";
import Table from 'react-bootstrap/Table';

// import React from 'react'
import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import student2 from "./students.json"

import axios from 'axios';

function BasicExample() {
    const data = student2


    return (

        <Table responsive striped bordered hover>
            <thead>
                <tr>

                    <th>Appointment</th>
                    <th>Student Info</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Subject</th>
                </tr>
            </thead>
            <tbody>
                {data.map(eachone => {
                    return <tr>

                        <td>{eachone._id}</td>
                        <td>{eachone.name}</td>
                        <td>{eachone.time}</td>
                        <td>{eachone.date}</td>
                        <td>{eachone.subject}</td>
                    </tr>
                })}
                {/* {student1.map((student1) => renderStudent)}  */}
            </tbody>
        </Table>
    );
}

const TutorHomePage = () => {

    const id = localStorage.getItem("token");


    useCalendlyEventListener({
        onProfilePageViewed: () => console.log("onProfilePageViewed"),
        onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
        onEventTypeViewed: () => console.log("onEventTypeViewed"),
        onEventScheduled: (e) => { if (e != null) { console.log(e.data.payload) } },
    });

    const [tutor, setTutor] = useState(axios
        .get("http://127.0.0.1:8000/tutors/" + id,
        ).then(function (response) {
            return {
                profile_pic: response.data["profile_pic"],
                name: response.data["name"],
                about_me: response.data["about_me"],
                date_of_birth: response.data["date_of_birth"],
                email: response.data["email"],
                subject: response.data["subject"]
            }
        }));

        
        const getTutor = (e) => {
        e.preventDefault();
        axios
            .get("http://127.0.0.1:8000/tutors/" + id,
            )
            .then(function (response) {
                setTutor({
                    ...tutor,
                    profile_pic: response.data["profile_pic"],
                    name: response.data["name"],
                    about_me: response.data["about_me"],
                    date_of_birth: response.data["date_of_birth"],
                    email: response.data["email"],
                    subject: response.data["subject"]
                })
                console.log(response.data)
            }).catch(function (response) {
                alert()
            })
        };
        
        
        window.onpageshow = getTutor;
        
        setTimeout(() => {
            axios
                .get("http://127.0.0.1:8000/tutors/" + id,
                )
                .then(function (response) {
                    setTutor({
                        ...tutor,
                        profile_pic: response.data["profile_pic"],
                        name: response.data["name"],
                        about_me: response.data["about_me"],
                        date_of_birth: response.data["date_of_birth"],
                        email: response.data["email"],
                        subject: response.data["subject"]
                    })
                    console.log(response.data)
                }).catch(function (response) {
                    alert()
                })
        }, "3000");

    return (
        // <div className='StudentHomepage'>
        //     <h2>This is the Tutor home page.</h2>    
        //     <InlineWidget url='https://calendly.com/davidpark450'/>
        // </div>

        <div className="TutorHomePage">
            <div class="container-wide">
                <div class="row">
                    <div class="col-4 col-6-medium col-12-small">
                        <article class="box style2">
                            <a class="image featured"><img src={ tutor.profile_pic } width={60} alt="" /></a>
                            {/* <p>{tutor.profile_pic}</p> */}
                            {/* <a class="image featured"><img src="images\cathit.gif" alt="" /></a> */}
                            <h3>{tutor.name}</h3>
                            <p>{tutor.email}</p>
                            <p>{tutor.subject}</p>
                            <p>{tutor.date_of_birth}</p>
                            <p>About me: {tutor.about_me}</p>
                        </article>
                    </div>
                    <div class="col-8 col-6-medium col-12-small">
                        <p>Accepted Appointment: </p>
                        <article class="box style1">
                            <BasicExample />
                        </article>

                        <p>Denied Appointment: </p>
                        <article class="box style1">
                            <BasicExample />
                        </article>
                    </div>
                </div>
            </div>
            {/* <PopupButton
                url='https://calendly.com/davidpark450'
                rootElement={document.getElementById("root")}
                text="Click here to schedule!"
            /> */}
            <article id="contact" class="wrapper style4">
                <div class="container medium">
                    <div class="col-12">
                        <hr />
                        <h3>Find us on ...</h3>
                        <ul class="social">
                            <li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
                            <li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
                            <li><a href="#" class="icon brands fa-linkedin-in"><span class="label">LinkedIn</span></a></li>
                            <li><a href="#" class="icon brands fa-tumblr"><span class="label">Tumblr</span></a></li>
                            <li><a href="#" class="icon brands fa-google-plus"><span class="label">Google+</span></a></li>
                            <li><a href="#" class="icon brands fa-github"><span class="label">Github</span></a></li>
                        </ul>
                        <ul class="contact">
                            <li><h4>UTD Phone: 972-883-2111</h4></li>
                            <li><h4>The University of Texas at Dallas </h4></li>
                            <li><h4>800 W. Campbell Road, </h4></li>
                            <li><h4>Richardson, Texas 75080-3021</h4></li>
                        </ul>
                        <hr />
                    </div>
                    <ul id="copyright">
                        <li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                    </ul>
                </div>
            </article>
        </div>
    );
};

export default TutorHomePage;