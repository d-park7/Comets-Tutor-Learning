//import React from 'react'
import { useCalendlyEventListener, InlineWidget } from 'react-calendly';

import NavbarStudent from './navbarstudent';

// Imports for testing tutor
import React, { useEffect, useState } from 'react';
import FastAPIClient from './client';
import config from './config';


const client = new FastAPIClient(config)


const StudentHomepage = () => {

    const [tutorList, setTutorList] = useState([])

    const getTutorList = (e) => {
        e.preventDefault();

        client.getTutors().then((data) => {
            // data.map(fields => (
            //     <div>{fields}</div>
            // ))
            setTutorList(data?.result);
            console.log(data)
        });
        
    };
 
    useCalendlyEventListener({
        onProfilePageViewed: () => console.log("onProfilePageViewed"),
        onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
        onEventTypeViewed: () => console.log("onEventTypeViewed"),
        onEventScheduled: (e) => {if (e != null){console.log(e.data.payload)}},
    });

    return(
        <div className='StudentHomepage'>
            {/* <h2>This is a list of tutors: {tutorList}</h2> */}
            <h2>This is the student home page.</h2>    
            <InlineWidget url='https://calendly.com/davidpark450'/>
            <button onClick={getTutorList}>Click here for list of tutors</button>
            <p>{tutorList}</p>
        </div>

    );
};

export default StudentHomepage;