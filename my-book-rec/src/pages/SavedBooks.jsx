import React from 'react';
import { useState, useEffect } from 'react';
import { db } from "../components/firebase";
import { getAuth } from "firebase/auth";
import { collection, getDocs, Query, query, where } from "firebase/firestore";
import '../css/savedbooks.css';

function SavedBooks() {
   const [savedBooks, setSavedBooks] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchSavedBooks = async () => {
         try {
            // retrieve current user
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
               alert("You need to be logged in to view your saved books.");
               setLoading(false);
               return;
            }

            // look through collection to find specific user
            const q = query(collection(db, "savedBooks"), where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const books = querySnapshot.docs.map(doc => ({
               id: doc.id,
               ...doc.data(),
            }));
            // const books = querySnapshot.docs.map(doc => doc.data());

            setSavedBooks(books);
        } catch (e) {
            console.error("Error fetching saved books: ", e);
        } finally {
            setLoading(false);
        }
      };
  
      fetchSavedBooks();
   }, []);

   if (loading) {
      return <p>Loading...</p>
   }
   
   return (
      <>
         <div className="saved-books">
            <h1>Saved Books</h1>
            {savedBooks.length === 0 ? (
               <p>No books saved yet!</p>
            ) : (
               <ul>
                  {savedBooks.map((book) => (
                     <li key={book.id} className="saved-book">
                        <h3>{book.recommendation.title}</h3>
                        <p><strong>Author:</strong> {book.recommendation.author}</p>
                        <p><strong>Age Rating:</strong> {book.recommendation.ageRating}</p>
                        <p><strong>Country Published:</strong> {book.recommendation.countryPublished}</p>
                        <p><strong>Summary:</strong> {book.recommendation.summary}</p>
                     </li>
                  ))}
               </ul>
            )}
         </div>
      </>
   )
}

export default SavedBooks