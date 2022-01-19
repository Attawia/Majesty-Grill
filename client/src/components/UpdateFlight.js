import axios from 'axios';
import { useEffect, useState } from "react";
import { authorize } from "../api/auth";
import react from 'react';
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import { Link,useHistory, useLocation} from 'react-router-dom';

const getPost = async (id) => {
    const res = await axios.post('http://localhost:5000/flights/getupdateflight',{_id:id});
    const flight = res.data;
    return flight;
}

var done = false;
const UpdateFlight =  () => {
    const history = useHistory();
    const location = useLocation();

    const {oldFlightNo} = location.state;

    const {id} = useParams();
    const [flight,updateFlight] = useState({});
    if(!done){
    const flightd = async ()=>{const promise = await getPost(id); return promise;  }
    const flightdetails = flightd();
    flightdetails.then(function(result){
    const flightdata = result;      
    updateFlight(flightdata);
    });
    }   
    done = true;

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
        console.log(flight);
        const updated = {_id:flight._id,flight:flight,oldFlightNo:oldFlightNo};
        const x = axios.patch('http://localhost:5000/flights/updateflight',updated);
        history.push('/flights/' + id);

        
   }
   
    return(
        <div>
        {allowed && <Paper>
             <Link to={`/flights/${id}`}>
            <button>
                Back 
                </button>
            </Link>
            <h1>Update Flight</h1>
            <form>
            <TextField  name="Flight Number"  variant="outlined" label="Flight Number" InputLabelProps={{ shrink: true }}  variant="outlined" value={flight.flightNo} onChange={(e) => updateFlight({...flight, flightNo : e.target.value})}/><br/><br/>
            <TextField  name="Departure Time"  type="datetime-local" label="Departure Time" InputLabelProps={{ shrink: true }}  variant="outlined"  value={flight.departureTime} onChange={(e) => updateFlight({...flight, departureTime : e.target.value})}/><br/><br/>
            <TextField  name="Arrival Time" type="datetime-local"  label="Arrival Time" InputLabelProps={{ shrink: true }}  variant="outlined"  value={flight.arrivalTime} onChange={(e) => updateFlight({...flight, arrivalTime : e.target.value})}/><br/><br/>
            <TextField  name="Economy Seats"  variant="outlined" label="Economy Seats" InputLabelProps={{ shrink: true }}  variant="outlined" value={flight.economySeats} onChange={(e) => updateFlight({...flight, economySeats : e.target.value})}/><br/><br/>
            <TextField  name="Business Seats"  variant="outlined" label="Business Seats" InputLabelProps={{ shrink: true }}  variant="outlined"  value={flight.businessSeats} onChange={(e) => updateFlight({...flight,businessSeats : e.target.value})}/><br/><br/>
            <TextField  name="First Class Seats"  variant="outlined" label="First Class Seats" InputLabelProps={{ shrink: true }}  variant="outlined" value={flight.firstSeats} onChange={(e) => updateFlight({...flight, firstSeats : e.target.value})}/><br/><br/>
            <TextField  name="Departure Airport"  variant="outlined" label="Departure Airport" InputLabelProps={{ shrink: true }}  variant="outlined" value={flight.depAirport} onChange={(e) => updateFlight({...flight, depAirport : e.target.value})}/><br/><br/>
            <TextField  name="Arrival Airport"  variant="outlined" label="Arrival Airport" InputLabelProps={{ shrink: true }}  variant="outlined" value={flight.arrAirport} onChange={(e) => updateFlight({...flight, arrAirport : e.target.value})}/><br/><br/>
            <button onClick={Submit}>Update</button>

        </form>
    </Paper>}
    {!allowed && <h3>Forbidden</h3>}
    </div>
    )
}
export default UpdateFlight;