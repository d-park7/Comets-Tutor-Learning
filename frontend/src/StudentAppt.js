import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import NavbarStudent from './navbarstudent';

function StudentAppointment() { 
    return ( 
       <div> 
        
          <NavbarStudent />
            <h1> This is the student appointment page </h1> 
      </div> 
    ); 
} 
export default StudentAppointment;