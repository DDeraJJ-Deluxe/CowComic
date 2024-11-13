import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Use this instead of calling getAuth() again
import '../css/userlogin.css';
import email_icon from '../assets/email.png';
import pass_icon from '../assets/padlock.png';

function UserLogin() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();

   const handleLogin = async () => {
      try {
         await signInWithEmailAndPassword(auth, email, password);
         console.log('User logged in successfully');
         navigate('/loginhomepage');
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
               <img src={email_icon} alt="user icon" />
               <input 
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div className="login-inputs">
               <img src={pass_icon} alt="password lock icon" />
               <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
         </div>
         {error && <div className="error-message">{error}</div>}
         <div id="reg-link">
            Don't have an account yet? <Link to="/register">Register here!</Link>
         </div>
         <div id="login-submit-container">
            <div className="submit" onClick={handleLogin}>Login</div>
         </div>
      </div>
   );
}

export default UserLogin;