import { useState, useEffect} from "react";
import axios from "axios";
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {Link, useLocation} from "react-router-dom";
import Popup from './../Popup.js'

const UserSearchReturn = () => {

    const location = useLocation();
    const {depFlight} = location.state;
    //const depFlight = {departureTime:"2021-12-11T16:03:00.000+00:00", depAirport:"aaaa", arrAirport:"bbbb"};
    const {reservation} = location.state;
    //const reservation = {};

    const [buttonPopup, setButtonPopup ] = useState(false);

    const[resultedFlights,setResultedFlights] = useState([]);
    const [passedFlight, setPassedFlight ] = useState();

    const handleSearchReturnFlights = async(e) => {
        const res = await axios.post('http://localhost:5000/flights/searchReturnFlightsUser',depFlight);
        return res.data;
    }

    function loadReturnFlights(){

        const searchedflights = async ()=>{const promise = await handleSearchReturnFlights(); return promise;}
        const flightsarr = searchedflights();
        flightsarr.then(function(result){
            setResultedFlights(result);
        })


    }

    function openPopUp(flightNo){

        let neededFlight = resultedFlights[0];
        for(let i = 0;i < resultedFlights.length;i++){
            if(resultedFlights[i].flightNo === flightNo){
                neededFlight = resultedFlights[i];
                console.log(neededFlight);
            }
        }
        setButtonPopup(true);
        setPassedFlight(neededFlight);


    }

    return(
        <div>
            <Link to={`/UserSearch`}>
                <button>Back</button>
            </Link>
            <h6>Return Flights</h6>
            {loadReturnFlights()}
            
            {resultedFlights.map(resultedFlight => (
            <div className="flights-preview" key={resultedFlight.flightNo} onClick={() => openPopUp(resultedFlight.flightNo)}>
                <h2>{resultedFlight.flightNo}</h2>
                <h4>{ resultedFlight.depAirport} ===={">"} { resultedFlight.arrAirport} </h4>
                <h3>Price:  {resultedFlight.priceEconomy}€    ~    {resultedFlight.priceBusiness}€</h3>
            </div>
          ))}
          <div>
          <Popup 
            trigger={buttonPopup} 
            setTrigger={setButtonPopup} 
            depFlight = {depFlight}
            arrFlight = {passedFlight}
            flightType = {"ret"}
            reservation = {reservation}
            />
          </div>

        </div>
    );

}

export default UserSearchReturn;