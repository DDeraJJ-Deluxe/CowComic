// import React from 'react';
// import Survey from "../components/Survey"
// import '../css/home.css';

// function Home() {

//    return (
//       <>
//          <Survey />
//          <button id="submit-btn">Submit</button>
//          <p id="chatGPT-reponse"></p>
//       </>
//    )
// }

// export default Home

import React, { useState } from 'react';
import Survey from "../components/Survey";
import '../css/home.css';

function Home() {
   const [recommendation, setRecommendation] = useState('');

   const handleSurveySubmit = (response) => {
      setRecommendation(response); // Update the recommendation state with the API response
   };

   return (
      <div className="home-container">
         <Survey onSubmit={handleSurveySubmit} />
         {recommendation && <p id="chatGPT-reponse">{recommendation}</p>} {/* Show the recommendation if it exists */}
      </div>
   );
}

export default Home;
