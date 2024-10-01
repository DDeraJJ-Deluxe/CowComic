import { Link } from "react-router-dom"

// this component creates the navigation bar section
function NavBar() {
   return (
      <nav id="nav">
         <Link to="/" id="cc-title">CowComic</Link>
         <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
         </ul>
      </nav>
   );
}

export default NavBar