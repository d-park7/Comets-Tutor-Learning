import React from 'react'
import Table from 'react-bootstrap/Table'
import { useCalendlyEventListener, InlineWidget } from 'react-calendly';

import NavbarStudent from './navbarstudent';



class StudentHomepage extends React.Component{
    render() {

        return(
            <div>
                <h2>This is the student home page.</h2>    
                <InlineWidget url='https://calendly.com/davidpark450'/>
                
            </div>
        )
    }
}

export default StudentHomepage;