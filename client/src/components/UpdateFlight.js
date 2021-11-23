import axios from 'axios';
import react from 'react';
import {useState} from 'react';
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import { Link,useHistory} from 'react-router-dom';

const getPost = async (id) => {
    const res = await axios.post('http://localhost:5000/flights/getupdateflight',{_id:id});
    const flight = res.data
    return flight;
}
const UpdateFlight =  () => {
    const history = useHistory();
    const {id} = useParams();
    const [flight,updateFlight] = useState({_id:id,
    flightNo:'',
    departureTime:'',
    arrivalTime:'',
    economySeats:'',
    businessSeats:'',
    firstSeats:'',
    depAirport:'',
    arrAirport:''
    });
    
   const Submit = (e) =>{

        e.preventDefault(); 
        console.log(flight);
        const updated = {_id:flight._id,flight:flight};
        const x = axios.patch('http://localhost:5000/flights/updateflight',updated);
        history.push('/flights/' + id);

        
   }

   const showData= (e)=>{
       e.preventDefault();
    const flightd = async ()=>{const promise = await getPost(id); return promise;  }
    const flightdetails = flightd();
    flightdetails.then(function(result){
       const flightdata = result;      
       updateFlight(flightdata);
    })

   }
   
   
    return(
        <Paper>
        <form>
            <button onClick = {showData}>Show Current Flight Data</button>
            <Typography variant="h6">FLIGHT DATA</Typography><br/>
            <TextField  name="Flight Number"  variant="outlined" label="Flight Number"  value={flight.flightNo} onChange={(e) => updateFlight({...flight, flightNo : e.target.value})}/><br/><br/>
            <TextField  name="Departure Time"  type="datetime-local" label="Departure Time" InputLabelProps={{ shrink: true }}  variant="outlined"  value={flight.departureTime} onChange={(e) => updateFlight({...flight, departureTime : e.target.value})}/><br/><br/>
            <TextField  name="Arrival Time" type="datetime-local"  label="Arrival Time" InputLabelProps={{ shrink: true }}  variant="outlined"  value={flight.arrivalTime} onChange={(e) => updateFlight({...flight, arrivalTime : e.target.value})}/><br/><br/>
            <TextField  name="Economy Seats"  variant="outlined" label="Economy Seats"  value={flight.economySeats} onChange={(e) => updateFlight({...flight, economySeats : e.target.value})}/><br/><br/>
            <TextField  name="Business Seats"  variant="outlined" label="Business Seats"  value={flight.businessSeats} onChange={(e) => updateFlight({...flight,businessSeats : e.target.value})}/><br/><br/>
            <TextField  name="First Class Seats"  variant="outlined" label="First Class Seats"  value={flight.firstSeats} onChange={(e) => updateFlight({...flight, firstSeats : e.target.value})}/><br/><br/>
            <TextField  name="Departure Airport"  variant="outlined" label="Departure Airport"  value={flight.depAirport} onChange={(e) => updateFlight({...flight, depAirport : e.target.value})}/><br/><br/>
            <TextField  name="Arrival Airport"  variant="outlined" label="Arrival Airport"  value={flight.arrAirport} onChange={(e) => updateFlight({...flight, arrAirport : e.target.value})}/><br/><br/>
            <button onClick={Submit}>Update</button>

        </form>
    </Paper>
    )
}
export default UpdateFlight;