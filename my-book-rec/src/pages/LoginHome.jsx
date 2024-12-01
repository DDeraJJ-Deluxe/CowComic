import React, { useState  } from 'react';
import Survey from "../components/Survey"
import { db } from "../components/firebase";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import '../css/loginhome.css';

function LoginHome() {
   // const [bookRecommendation, setRecommendation] = useState(null);
   const handleSaveBook = async () => {
      // access the recommendation from the Survey component
      const bookRecommendation = document.querySelector(".recommendation-message").textContent;

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
            // title: bookRecommendation.title,
            // author: bookRecommendation.author,
            // ageRating: bookRecommendation.ageRating,
            // countryPublished: bookRecommendation.countryPublished,
            // summary: bookRecommendation.summary,
            bookRecommendation,
            timestamp: new Date(),
         });
         
         alert(`Book "${bookRecommendation.title}" saved!`);
      } catch (e) {
         console.error("Error saving book recommendation: ", e);
         alert("Failed to save book recommendation.");
      }
    };
   return (
      <>
         {/* <Survey onSaveRecommendation={setRecommendation}/> */}
         <Survey />
            <div className="save-btn-container">
               <button id="save-btn" onClick={handleSaveBook}>Save Book</button>
            </div>
      </>
   )
}

export default LoginHome