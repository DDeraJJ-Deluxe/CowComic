import React from 'react'
import { Link } from "react-router-dom"

// this component creates the navigation bar section
function NavBar({isLoggedIn, username, onLogout}) {
   const handleLogoutClick = (event) => {
      event.preventDefault(); // prevents default navigation behavior
      onLogout(); // calls the logout function
   };

   return (
      <nav id="nav">
      <Link to="/" id="cc-title">CowComic</Link>
         <ul className="nav-links">
            {isLoggedIn ? (
               <>
                  <li><Link to="/saved-books">Saved Books</Link></li>
                  <li><a href="/" onClick={handleLogoutClick}>Logout</a></li>
               </>
            ) : (
               <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
               </>
            )}
         </ul>
      </nav>
   );
}

export default NavBar