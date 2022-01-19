import react from 'react';
import {TextField, Button, Paper, Typography} from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { createFlight } from '../../actions/FlightForm.js'
import axios from 'axios';
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { authorize } from "../../api/auth";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const FlightForm = () => {
    const [flightData,setFlightData] = react.useState({
        flightNo :'',
        departureTime :new Date(),
        arrivalTime : new Date(),
        economySeats : '',
        businessSeats :'',
        firstSeats : '0',
        depAirport :'',
        arrAirport : '',
        priceEconomy: '',
        priceBusiness: '',
        baggageAllowance: '',
    })
    const classes = useStyles();
    const dispatch = useDispatch();
    
    
    const [allowed,setAllowed] = useState(false);
    const [alreadyChecked,setAlreadyChecked] = useState(false);

    useEffect(()=>
    {
    const isAllowed = async () =>{
        const flag = await authorize("/flights");
        console.log(flag);
        if(!alreadyChecked){
            setAllowed(flag);
            setAlreadyChecked(true);
        }

    }

    isAllowed();
    },[alreadyChecked])

    const [message,setMessage] = react.useState("");


    const Submit = async (e) =>{
        e.preventDefault();
        let flag = true;
        const res = await createFlight(flightData);
        flag = res.data;
        if(flag){
            setFlightData({
                flightNo :'',
                departureTime :new Date(),
                arrivalTime : new Date(),
                economySeats : '',
                businessSeats :'',
                firstSeats : '0',
                depAirport :'',
                arrAirport : '',
                priceEconomy: '',
                priceBusiness: '',
                baggageAllowance: '',
            });
            setMessage("Flight Successfuly Created!");
    }
    else{
        setMessage('Flight number already used')
    }
    };

    return(
        <div>
    {allowed && 
        <form autoComplete="off" align="center" noValidate onSubmit={Submit}>
        <Navbar/>
            <h1 variant="h6">Create a flight</h1>
            <h4>{message}</h4>
            <TextField  name="Flight Number"  variant="outlined" label="Flight Number" value={flightData.flightNo} onChange={(e) => setFlightData({...flightData, flightNo : e.target.value})}/><br/><br/>
            <TextField  name="Departure Time"  type="datetime-local" label="Departure Time"  InputLabelProps={{ shrink: true }}  variant="outlined"  value={flightData.departureTime} onChange={(e) => setFlightData({...flightData, departureTime : e.target.value})}/><br/><br/>
            <TextField  name="Arrival Time" type="datetime-local"  label="Arrival Time" InputLabelProps={{ shrink: true }}  variant="outlined"  value={flightData.arrivalTime} onChange={(e) => setFlightData({...flightData, arrivalTime : e.target.value})}/><br/><br/>
            <TextField  name="Economy Seats"  variant="outlined" label="Economy Seats"  value={flightData.economySeats} onChange={(e) => setFlightData({...flightData, economySeats : e.target.value})}/><br/><br/>
            <TextField  name="Business Seats"  variant="outlined" label="Business Seats"  value={flightData.businessSeats} onChange={(e) => setFlightData({...flightData,businessSeats : e.target.value})}/><br/><br/>
            <TextField  name="Departure Airport"  variant="outlined" label="Departure Airport"  value={flightData.depAirport} onChange={(e) => setFlightData({...flightData, depAirport : e.target.value})}/><br/><br/>
            <TextField  name="Arrival Airport"  variant="outlined" label="Arrival Airport"  value={flightData.arrAirport} onChange={(e) => setFlightData({...flightData, arrAirport : e.target.value})}/><br/><br/>
            <TextField  name="Price Economy"  variant="outlined" label="Price Economy"  value={flightData.priceEconomy} onChange={(e) => setFlightData({...flightData, priceEconomy : e.target.value})}/><br/><br/>
            <TextField  name="Price Business"  variant="outlined" label="Price Business"  value={flightData.priceBusiness} onChange={(e) => setFlightData({...flightData, priceBusiness : e.target.value})}/><br/><br/>
            <TextField  name="Baggage Allowance"  variant="outlined" label="Baggage Allowance"  value={flightData.baggageAllowance} onChange={(e) => setFlightData({...flightData, baggageAllowance : e.target.value})}/><br/><br/>
            
            <button onClick={Submit} className={classes.buttonSubmit}>Create</button>
        </form>
    }
    {!allowed && <h3>Forbidden</h3>}
    </div>
        )
}

export default FlightForm;