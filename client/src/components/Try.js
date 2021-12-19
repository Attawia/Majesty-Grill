import { useState } from "react";
import axios from "axios";
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {Link} from "react-router-dom";

import Popup from './Popup';
import Summary from './Summary.js';
const Try = () => {


const [buttonPopup, setButtonPopup ] = useState(false);
    return (
        <div className="home">
            <main>
            <h1>Try</h1>
            <br></br>
            <button onClick ={() => setButtonPopup(true)}>Open PopUp </button>
            </main>

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            </Popup>


        </div>
    );
      
  
}

export default Try;