import { Link } from 'react-router-dom';
import { useState } from 'react';
import { auth } from './firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../css/userlogin.css';
import user_icon from '../assets/user.png'
import pass_icon from '../assets/padlock.png'

// this component creates the user login component
function UserLogin() {
   // State variables to store username and password
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');

   const handleLogin = async () => {
      const auth = getAuth();
      try {
         // Firebase authentication method
         await signInWithEmailAndPassword(auth, username, password);
         console.log('User logged in successfully');
      } catch (err) {
         setError('Invalid username or password');
      }
   };

   return (
      <div id="login-container">
         <div id="login-header">
            <div id="login-text">Login</div>
         </div>
         <div id="login-info">
            <div className="login-inputs">
               <img src = {user_icon} alt = "user icon" />
               <input 
                  type = "text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
            </div>
            <div className="login-inputs">
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
         <div id="reg-link">
            Don't have an account yet?{' '}
            <Link to="/register">Register here!</Link>
         </div>
         <div id="login-submit-container">
            <div className="submit" onClick={handleLogin}>Login</div>
         </div>
      </div>
   );
}

export default UserLogin