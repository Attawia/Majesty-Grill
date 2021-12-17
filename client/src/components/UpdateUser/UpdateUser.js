import axios from 'axios';
import {useState} from 'react';
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import { Link,useHistory} from 'react-router-dom';

const getPost = async (id) => {
    const res = await axios.post('http://localhost:5000/getUpdateUser',{_id:id});
    const user = res.data;
    return user;
}
var done = false;
const UpdateUser =  () => {
    const history = useHistory();
    const {id} = useParams();
    const [user,updateUser] = useState({});
    if(!done){
    const userd = async ()=>{const promise = await getPost(id); return promise;  }
    const userDetails = userd();
    userDetails.then(function(result){
    const userData = result;      
    updateUser(userData);
    });
    }   
    done = true;

    
   const Submit = (e) =>{

        e.preventDefault(); 
        const updated = {_id:user._id,user:user};
        const x = axios.patch('http://localhost:5000/flights/updateUser',updated);
        //history.push('/flights/' + id);  //this should redirect to the user's page to display updated info. Unimplemented till now
 
        
   }

   //TODO all above is done, change values in html below and implement a user profile page
   
    return(
        <Paper>
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
    </Paper>
    )
}
export default UpdateUser;