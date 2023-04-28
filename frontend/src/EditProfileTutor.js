import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import NavbarTutor from './NavbarTutor';

function ProfileTestTutor() { 
    return ( 
       <div> 
        
          <NavbarTutor />
            <h1> This is the Tutor profile edit page </h1> 
      </div> 
    ); 
} 
export default ProfileTestTutor;