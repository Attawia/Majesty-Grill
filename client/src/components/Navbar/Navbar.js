import './Navbar2.js';
import './Navbar.css';
import {Link} from 'react-router-dom';
import logo from './logofinal.png';
import name from './name.png';

const Navbar = ()=>{
  const Clicked=()=>{
    localStorage.setItem('token',"");
    console.log('helllo');
  }
    return(

        <nav className="navbar">
            <img src={logo} width={80} alt="logo"/>
            <img src={name} width={230} alt="logo"/>
      {/*<h1>Majesty Airlines</h1>*/}
      <div className="links">
        <Link to={"/users/profile/"}>
        <a href="#">Profile</a>
        </Link>
        <Link to={"/allReservations"}>
        <a href="#">My Reservations</a>
        </Link>
        <Link to={"/"}>
        <a href="#" onClick={Clicked}>Sign Out</a>
        </Link>
      </div>
    </nav>
    );
}
export default Navbar;