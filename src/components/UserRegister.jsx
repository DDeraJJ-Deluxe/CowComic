import { Link } from 'react-router-dom';
import { useState } from 'react';
import { auth, db} from './firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";

import '../css/userregister.css';
import user_icon from '../assets/user.png'
import email_icon from '../assets/email.png'
import pass_icon from '../assets/padlock.png'

// this component creates the user register component
function UserRegister() {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');

   const handleRegister = async () => {
      const auth = getAuth();
      try {
         await createUserWithEmailAndPassword(auth, email, password);
         console.log('User registered successfully');
         const user = auth.currentUser;
         // If user is created successfully, store additional information in Firestore
         if (user) {
            await setDoc(doc(db, 'Users', user.uid), {
               username: username,
               email: user.email
            });
         }
      } catch (err) {
         // Customize error messages based on Firebase error codes
         switch (err.code) {
            case 'auth/invalid-email':
               setError('Please enter a valid email address.');
               break;
            case 'auth/missing-email':
               setError('Please provide an email address.');
               break;
            case 'auth/weak-password':
               setError('Password should be at least 6 characters.');
               break;
            case 'auth/missing-password':
               setError('Please provide a password.');
               break;
            case 'auth/email-already-in-use':
               setError('This email is already registered. Please log in or use another email.');
               break;
            default:
               setError('Registration failed. Please try again.');
               break;
         } 
      }
   };

   return (
      <div id="reg-container">
         <div id="reg-header">
            <div id="reg-text">Sign Up</div>
         </div>
         <div id="reg-info">
            <div className="reg-inputs">
               <img src = {user_icon} alt = "user icon" />
               <input
                  type = "text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
            </div>
            <div className="reg-inputs">
               <img src = {email_icon} alt = "email icon" />
               <input
                  type = "email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div className="reg-inputs">
               <img src = {pass_icon} alt = "password lock icon" />
               <input
                  type = "password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
         </div>
         {error && <div className="error-message">{error}</div>}
         <div id="login-link">
            Already have an account?{' '}
            <Link to="/login">Login here!</Link>
         </div>
         <div id="reg-submit-container">
            <div className="submit" onClick={handleRegister}>Sign Up</div>
         </div>
      </div>
   );
}

export default UserRegister