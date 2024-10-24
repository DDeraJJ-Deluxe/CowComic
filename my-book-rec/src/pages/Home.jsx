import React from 'react';
import Survey from "../components/Survey"
import '../css/home.css';

function Home() {

   return (
      <>
         <Survey />
         <button id="submit-btn">Submit</button>
         <p id="chatGPT-reponse"></p>
      </>
   )
}

export default Home