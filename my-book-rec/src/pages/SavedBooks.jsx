import React from 'react';
import { useState, useEffect } from 'react';
import { db } from "../components/firebase";
import { collection, getDocs } from "firebase/firestore";
import '../css/savedbooks.css';

function SavedBooks() {
   const [savedBooks, setSavedBooks] = useState([]);

   useEffect(() => {
      const fetchSavedBooks = async () => {
         try {
            const querySnapshot = await getDocs(collection(db, "savedBooks"));
            const books = querySnapshot.docs.map(doc => ({
               id: doc.id,
               ...doc.data(),
            }));
            setSavedBooks(books);
        } catch (e) {
            console.error("Error fetching saved books: ", e);
        } finally {
            setLoading(false);
        }
      };
  
      fetchSavedBooks();
    }, []);
   
   return (
      <>
         <div className="saved-books">
            <h1>Saved Books</h1>
               <ul>
                  {savedBooks.map((book) => (
                     <li key={book.id}>{book.recommendation}</li>
                  ))}
               </ul>
         </div>
      </>
   )
}

export default SavedBooks