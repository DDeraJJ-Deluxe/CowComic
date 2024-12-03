import React, { useState } from 'react';
import Survey from "../components/Survey";
import '../css/home.css';

function Home() {
   const [recommendation, setRecommendation] = useState(null);

   const handleSurveySubmit = (response) => {
      setRecommendation(response); // Update the recommendation state with the API response
   };

   return (
      <div className="home-container">
         <Survey onSubmit={handleSurveySubmit} />
      </div>
   );
}

export default Home;
