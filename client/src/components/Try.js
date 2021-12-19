import { useState } from "react";
import axios from "axios";
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {Link} from "react-router-dom";
import React from "react";
import PopUp from './PopUp.js'

const Try = () => {

    const [buttonPopup, setButtonPopup] = useState(false);

    return (
        
        <div className="try">
            <main>
                <h1>Kosom Hayaty</h1>
                <br/><br/>
                <Button onClick = {() => setButtonPopup(true)}>Bedan</Button>
                <br/><br/>
            </main>

            <PopUp trigger={buttonPopup} setTrigger = {setButtonPopup}>
                <h1>My PopUp</h1>
                <p>ACL Majesty Grill</p>
            </PopUp>

            {/*--------------------Tagrobaaaaaaaaaa-------------------*/}

            {/*--------------------Tagrobaaaaaaaaaa-------------------*/}
        </div>
    );
      
  
}

export default Try;