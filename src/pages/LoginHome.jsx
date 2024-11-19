import React from 'react';
import Survey from "../components/Survey"
import '../css/loginhome.css';

function LoginHome() {

   return (
      <>
         <Survey />
         <button id="submit-btn">Submit</button>
         <button id="save-btn">Save Book</button>
         <p id="chatGPT-reponse"></p>
      </>
   )
}

export default LoginHome