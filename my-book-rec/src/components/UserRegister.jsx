import '../css/userregister.css';
import user_icon from '../assets/user.png'
import email_icon from '../assets/email.png'
import pass_icon from '../assets/padlock.png'

// this component creates the user register component
function UserLogin() {
   return (
      <div className = "reg-container">
         <div className = "reg-header">
            <div className = "reg-text">Sign Up</div>
            <div className = "underline"></div>
         </div>
         <div className = "reg-info">
            <div className = "reg-inputs">
               <img src = {user_icon} alt = "" width = "20px" height = "20px"/>
               <input type = "text"/>
            </div>
            <div className = "reg-inputs">
               <img src = {email_icon} alt = "" width = "20px" height = "20px"/>
               <input type = "email"/>
            </div>
            <div className = "reg-inputs">
               <img src = {pass_icon} alt = "" width = "20px" height = "20px"/>
               <input type = "password"/>
            </div>
         </div>
         <div className = "reg-submit-container">
            <div className="submit">Sign Up</div>
            <div className="submit">Login</div>
         </div>
      </div>
   );
}

export default UserLogin