import './Navbar2.js';
import './Navbar.css';
import {Link, useHistory} from 'react-router-dom';
import logo from './logofinal.png';
import name from './name.png';

const Navbar = ()=>{
  const clicked = ()=>{
    localStorage.setItem('token',"");

  }
    return(

        <nav className="navbar">

            <img src={logo} width={80} alt="logo"/>
            <img src={name} width={230} alt="logo"/>

      {/*<h1>Majesty Airlines</h1>*/}

    </nav>
    );
}
export default Navbar;