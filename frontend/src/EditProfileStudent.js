import '../src/assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import NavbarStudent from './navbarstudent';

function ProfileTestStudent() { 
    return ( 
       <div> 
        
          <NavbarStudent />
            <h1> This is the student profile edit page </h1> 
      </div> 
    ); 
} 
export default ProfileTestStudent;