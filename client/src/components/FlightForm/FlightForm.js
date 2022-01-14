import react from 'react';
import {TextField, Button, Paper, Typography} from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { createFlight } from '../../actions/FlightForm.js'
import axios from 'axios';
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { authorize } from "../../api/auth";

const FlightForm = () => {
    const [flightData,setFlightData] = react.useState({
        flightNo :'',
        departureTime :new Date(),
        arrivalTime : new Date(),
        economySeats : '',
        businessSeats :'',
        firstSeats : '',
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


    const Submit = (e) =>{
        e.preventDefault();
        dispatch(createFlight(flightData));
        setFlightData({
            flightNo :'',
            departureTime :new Date(),
            arrivalTime : new Date(),
            economySeats : '',
            businessSeats :'',
            firstSeats : '',
            depAirport :'',
            arrAirport : '',
            priceEconomy: '',
            priceBusiness: '',
            baggageAllowance: '',

        });
    };

    return(
        <div>
    {allowed && <Paper>
        <form autoComplete="off" noValidate onSubmit={Submit}>
        <Link to={`/flights/`}>
            <button>
                Back 
                </button>
            </Link>
            <h1 variant="h6">Create a flight</h1>
            <TextField  name="Flight Number"  variant="outlined" label="Flight Number"  value={flightData.flightNo} onChange={(e) => setFlightData({...flightData, flightNo : e.target.value})}/><br/><br/>
            <TextField  name="Departure Time"  type="datetime-local" label="Departure Time" InputLabelProps={{ shrink: true }}  variant="outlined"  value={flightData.departureTime} onChange={(e) => setFlightData({...flightData, departureTime : e.target.value})}/><br/><br/>
            <TextField  name="Arrival Time" type="datetime-local"  label="Arrival Time" InputLabelProps={{ shrink: true }}  variant="outlined"  value={flightData.arrivalTime} onChange={(e) => setFlightData({...flightData, arrivalTime : e.target.value})}/><br/><br/>
            <TextField  name="Economy Seats"  variant="outlined" label="Economy Seats"  value={flightData.economySeats} onChange={(e) => setFlightData({...flightData, economySeats : e.target.value})}/><br/><br/>
            <TextField  name="Business Seats"  variant="outlined" label="Business Seats"  value={flightData.businessSeats} onChange={(e) => setFlightData({...flightData,businessSeats : e.target.value})}/><br/><br/>
            <TextField  name="First Class Seats"  variant="outlined" label="First Class Seats"  value={flightData.firstSeats} onChange={(e) => setFlightData({...flightData, firstSeats : e.target.value})}/><br/><br/>
            <TextField  name="Departure Airport"  variant="outlined" label="Departure Airport"  value={flightData.depAirport} onChange={(e) => setFlightData({...flightData, depAirport : e.target.value})}/><br/><br/>
            <TextField  name="Arrival Airport"  variant="outlined" label="Arrival Airport"  value={flightData.arrAirport} onChange={(e) => setFlightData({...flightData, arrAirport : e.target.value})}/><br/><br/>
            <TextField  name="Price Economy"  variant="outlined" label="Price Economy"  value={flightData.priceEconomy} onChange={(e) => setFlightData({...flightData, priceEconomy : e.target.value})}/><br/><br/>
            <TextField  name="Price Business"  variant="outlined" label="Price Business"  value={flightData.priceBusiness} onChange={(e) => setFlightData({...flightData, priceBusiness : e.target.value})}/><br/><br/>
            <TextField  name="Baggage Allowance"  variant="outlined" label="Baggage Allowance"  value={flightData.baggageAllowance} onChange={(e) => setFlightData({...flightData, baggageAllowance : e.target.value})}/><br/><br/>
            
            <Button onClick={Submit} className={classes.buttonSubmit}>Create</Button>

        </form>
    </Paper>}
    {!allowed && <h3>Forbidden</h3>}
    </div>
        )
}

export default FlightForm;