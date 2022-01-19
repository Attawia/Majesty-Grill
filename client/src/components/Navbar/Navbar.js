import './Navbar2.js';
import './Navbar.css';
import {Link, useHistory} from 'react-router-dom';
import logo from './logofinal.png';
import name from './name.png';
import {getUsername} from './../../api/auth.js'

const Navbar = ()=>{
  const clicked = ()=>{
    localStorage.setItem('token',"");

  }
    return(

        <nav className="navbar">
           <Link to={'/usersearch'}>
            <img src={logo} width={80} alt="logo"/>
            <img src={name} width={230} alt="logo"/>
            </Link>
      {/*<h1>Majesty Airlines</h1>*/}
      <div className="links">
        <Link to={"/users/profile/"}>
        <a href="#">Profile</a>
        </Link>
        <Link to={"/allReservations"}>
        <a href="#">My Reservations</a>
        </Link>
        <Link to={"/"}>
        <a href="#" onClick={clicked}>Sign Out</a>

        </Link>
      </div>
    </nav>
    );
}
export default Navbar;