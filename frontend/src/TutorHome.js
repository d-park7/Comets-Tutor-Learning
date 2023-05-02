import React from 'react'
import { useCalendlyEventListener, InlineWidget } from 'react-calendly';
import { PopupButton } from "react-calendly";

import NavbarStudent from './navbarstudent';

const TutorHomePage = () => {
 
    useCalendlyEventListener({
        onProfilePageViewed: () => console.log("onProfilePageViewed"),
        onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
        onEventTypeViewed: () => console.log("onEventTypeViewed"),
        onEventScheduled: (e) => {if (e != null){console.log(e.data.payload)}},
    });

    return(
        // <div className='StudentHomepage'>
        //     <h2>This is the Tutor home page.</h2>    
        //     <InlineWidget url='https://calendly.com/davidpark450'/>
        // </div>

        <div className="TutorHomePage">
            <h2> This is the Tutor home page.</h2>
            <PopupButton
                url='https://calendly.com/davidpark450'
                rootElement={document.getElementById("root")}
                text="Click here to schedule!"
            />
        </div>
    );
};

export default TutorHomePage;