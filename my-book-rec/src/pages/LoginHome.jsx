import React, { useState  } from 'react';
import Survey from "../components/Survey"
import { db } from "../components/firebase";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import '../css/loginhome.css';

function LoginHome() {
   // use state to get the JSON recommendation from chatgpt
   const [JsonRecommendation, setJsonRecommendation] = useState(null);

   // gets the JSON recommendation from Survey and set it as the user's recommendation in LoginHome
   // this is used as a callback function so that the Survey can pass in the recommendation to the LoginHome 
   const handleJsonFromSurvey = (data) => {
      setJsonRecommendation(data);
   }

   const handleSaveBook = async () => {
      // access the recommendation from the Survey component
      const bookRecommendation = JsonRecommendation;

      if (!bookRecommendation || !bookRecommendation.title) {
        alert("No book recommendation to save!");
        return;
      }
  
      try {
         // get current user
         const auth = getAuth();
         const user = auth.currentUser;

         if (!user) {
            alert("You need to be logged in to save a book.");
            return;
         }

         // save the recommendation to Firestore
         const docRef = await addDoc(collection(db, "savedBooks"), {
            userId: user.uid,
            title: bookRecommendation.title,
            author: bookRecommendation.author,
            ageRating: bookRecommendation.ageRating,
            countryPublished: bookRecommendation.countryPublished,
            summary: bookRecommendation.summary,
            timestamp: new Date()
         });
         
         alert(`Book "${bookRecommendation.title}" saved!`);
      } catch (e) {
         console.error("Error saving book recommendation: ", e);
         alert("Failed to save book recommendation.");
      }
    };
   return (
      <>
         {/* pass in the callback function as a prop */}
         <Survey onSubmit={handleJsonFromSurvey}/>
            <div className="save-btn-container">
               <button id="save-btn" onClick={handleSaveBook}>Save Book</button>
            </div>
      </>
   )
}

export default LoginHome