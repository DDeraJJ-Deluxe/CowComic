import React from 'react'
import { Link } from "react-router-dom"

// this component creates the navigation bar section
function NavBar({isLoggedIn, onLogout}) {
   return (
      <nav id="nav">
      <Link to="/" className="nav-title" id="cc-title">CowComic</Link>
         <ul className="nav-links">
            {isLoggedIn ? (
               <>
                  <li><Link to="/saved-books">Saved Books</Link></li>
                  <li><button onClick={onLogout} className="nav-btn">Logout</button></li>
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