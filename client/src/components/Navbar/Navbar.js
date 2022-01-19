import './Navbar2.js';
import './Navbar.css';
import {Link, useHistory} from 'react-router-dom';
import {useState} from 'react';
import { getUsername,isGuest } from '../../api/auth.js';
import logo from './logofinal.png';
import name from './name.png';
import {getUsername} from './../../api/auth.js'

const Navbar = ()=>{
  const clicked = ()=>{
    localStorage.setItem('token',"");

  }


  const [username,setUsername] = useState();
  const [adminFlag,setAdmin] = useState(false);
  const [guestFlag,setGuest] = useState(false);
  const [flag, setFlag] = useState(false);

  const getUser = async () => {

    const theUser = await getUsername(); 
    setUsername(theUser);
    if(theUser == "Administrator")
      setAdmin(true);
  }
  const guestCheck = async () => {

    const guestUser = await isGuest();
    setGuest(guestUser);

  }

  if(!flag){
      getUser();
      guestCheck();
      setFlag(true);
 }

  





    return(
<div>
        {!adminFlag && !guestFlag && <nav className="navbar">
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
    </nav>}

    {adminFlag && !guestFlag && <nav className="navbar">
           <Link to={'/flights/'}>
            <img src={logo} width={80} alt="logo"/>
            <img src={name} width={230} alt="logo"/>
            </Link>
      {/*<h1>Majesty Airlines</h1>*/}
      <div className="links">
        <Link to={"/users/profile/"}>
        <a href="#">Profile</a>
        </Link>
        <Link to={"/"}>
        <a href="#" onClick={clicked}>Sign Out</a>

        </Link>
      </div>
    </nav>}

    {!adminFlag && guestFlag && <nav className="navbar">
           <Link to={'/flights/'}>
            <img src={logo} width={80} alt="logo"/>
            <img src={name} width={230} alt="logo"/>
            </Link>
      {/*<h1>Majesty Airlines</h1>*/}
      <div className="links">
        <Link to={"/"}>
        <a href="#" onClick={clicked}>Sign In</a>

        </Link>
      </div>
    </nav>}



    </div>
    );
}
export default Navbar;