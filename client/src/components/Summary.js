import React from 'react'
import './Summary.css'
import axios from "axios";
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {Link,useLocation,useHistory} from "react-router-dom";
import Try from './Try';

function Summary(props){
    const history = useHistory();
    const location = useLocation();
    const {depFlight} = location.state;
    const {retFlight} = location.state;
    const {reservation} = location.state;

    let depPrice = 0;
    let depCabin = "";
    let retPrice = 0;
    let retCabin = "";
    if (reservation.cabinDeparture == "Economy")
    {
        depPrice = depFlight.priceEconomy ;
        depCabin = "Economy";
    }
    else
    {
        depPrice = depFlight.priceBusiness ;
        depCabin = "Business";
    }

    if (reservation.cabinReturn == "Economy")
    {
        retPrice = retFlight.priceEconomy ;
        retCabin = "Economy";
    }
    else
    {
        depPrice = retFlight.priceBusiness ;
        retCabin = "Business";
    }
    let totalPriceFinal = 0;
    totalPriceFinal = depPrice + retPrice ;
    
    return(
        <div className="Summary">
            <button className="return" onClick={history.go(-1)}>Back</button> 
            <h1 id="flightSummary">Flight Summary</h1>
            <h2 id="departure">Departure Flight:</h2>
            <h2 id="arrival">Return Flight:</h2>

            <h6 id="depNum">Flight number: {depFlight.flightNo}</h6>
            <h6 id="depDepTime">Flight Departure Time: {depFlight.departureTime}</h6>
            <h6 id="depArrTime">Flight Arrival Time: {depFlight.arrivalTime}</h6>
            <h6 id="depPrice">Price: {depPrice}€</h6>
            <h6 id="depCabin">Cabin: {depCabin}</h6>

            <h6 id="arrNum">Flight number: {retFlight.flightNo}</h6>
            <h6 id="arrDepTime">Flight Departure Time: {retFlight.departureTime}</h6>
            <h6 id="arrArrTime">Flight Arrival Time: {retFlight.arrivalTime}</h6>
            <h6 id="arrPrice">Price: {retPrice}€</h6>
            <h6 id="arrCabin">Cabin: {retCabin}</h6>

            <h6 id="totalPrice">Total Price: {totalPriceFinal}€</h6>

            <Link to={{ 
                pathname: "/departureSeats/" ,
                state : {depFlight,retFlight,reservation}
                }}>
            <button className="confirm-disha">Confirm and choose seats</button> 
            </Link>
            </div>
    );
}
export default Summary