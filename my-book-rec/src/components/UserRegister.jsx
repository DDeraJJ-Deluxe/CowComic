import { Link } from 'react-router-dom';
import '../css/userregister.css';
import user_icon from '../assets/user.png'
import email_icon from '../assets/email.png'
import pass_icon from '../assets/padlock.png'

// this component creates the user register component
function UserRegister() {
   return (
      <div id="reg-container">
         <div id="reg-header">
            <div id="reg-text">Sign Up</div>
         </div>
         <div id="reg-info">
            <div className="reg-inputs">
               <img src = {user_icon} alt = "user icon" />
               <input type = "text" placeholder="Username"/>
            </div>
            <div className="reg-inputs">
               <img src = {email_icon} alt = "email icon" />
               <input type = "email" placeholder="Email"/>
            </div>
            <div className="reg-inputs">
               <img src = {pass_icon} alt = "password lock icon" />
               <input type = "password" placeholder="Password"/>
            </div>
         </div>
         <div id="login-link">
            Already have an account?{' '}
            <Link to="/login">Login here!</Link>
         </div>
         <div id="reg-submit-container">
            <div className="submit">Sign Up</div>
         </div>
      </div>
   );
}

export default UserRegister