import { Link } from 'react-router-dom';
import '../css/userlogin.css';
import user_icon from '../assets/user.png'
import pass_icon from '../assets/padlock.png'

// this component creates the user login component
function UserLogin() {
   return (
      <div id="login-container">
         <div id="login-header">
            <div id="login-text">Login</div>
         </div>
         <div id="login-info">
            <div className="login-inputs">
               <img src = {user_icon} alt = "user icon" />
               <input type = "text" placeholder="Username"/>
            </div>
            <div className="login-inputs">
               <img src = {pass_icon} alt = "password lock icon" />
               <input type = "password" placeholder="Password"/>
            </div>
         </div>
         <div id="reg-link">
            Don't have an account yet?{' '}
            <Link to="/register">Register here!</Link>
         </div>
         <div id="login-submit-container">
            <div className="submit">Login</div>
         </div>
      </div>
   );
}

export default UserLogin