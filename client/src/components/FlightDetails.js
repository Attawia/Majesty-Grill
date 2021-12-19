import {  useParams,Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetFlightById } from "../actions/index.js";

import api from "../api/index.js";

const FlightDetails = () => {

    const {id} = useParams();
    const [flight, setFlight] = useState(null);


    useEffect(()=>
    {
     const getTheFlight = async () =>
     {
        const theFlight = await GetFlightById(id); 
        console.log(theFlight);
        if(theFlight) setFlight(theFlight);
     }
        getTheFlight();
    },[])

    
    const deleteFlight = async() =>
    {
     const resp =  await api.delete('http://localhost:5000/flights/' + id);
        
    }

    return ( 
    <div>
        
        <Link to={`/flights/`}>
            <button>
                Back 
                </button>
            </Link>
        <h1>Flight Details</h1>    
        {flight &&
    <table border = '1'>
        <tr>
        <th>Flight Number</th>
        <td>{flight.flightNo}</td>
        </tr>

        <tr>
            <th>Departure Time</th>
            <td>{flight.departureTime}</td>

        </tr>

        <tr>
            <th>Arrival Time</th>
            <td>{flight.arrivalTime}</td>
        </tr>

        <tr>
            <th>Economy Seats</th>
            <td>{flight.economySeats}</td>
        </tr>

        <tr>
             <th>Business Seats</th>
             <td>{flight.businessSeats}</td>
        </tr>

        <tr>
            <th>Departure Airport</th>
            <td>{flight.depAirport}</td>
        </tr>

        <tr>
            <th>Arrival Airport</th>
            <td>{flight.arrAirport}</td>
        </tr>
    </table>
}
<Link to='/flights'>
    <button onClick={()=>{if(window.confirm('Are you sure you wish to delete this item?')) deleteFlight()}} >
        DELETE
        </button>
        </Link>

        <Link to={`/flights/updateflight/${id}`}>
        <button>
             Update 
             </button>
        </Link>
        
    </div>
     );
}
 
export default FlightDetails;