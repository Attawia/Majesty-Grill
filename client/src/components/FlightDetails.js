import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetFlightById } from "../../../actions/index";
import api from "../../../api/index";

const FlightDetails = () => {

    const {id} = useParams();
    const [flight, setFlight] = useState(null);
    const navigate = useNavigate();


    useEffect(()=>
    {
     const getTheFlight = async () =>
     {
        const theFlight = await GetFlightById(id); 
        if(theFlight) setFlight(theFlight);
     }
        getTheFlight();
    },[])

    
    const deleteFlight = async() =>
    {
     const resp =  await api.delete('http://localhost:5001/flights/' + id);
     navigate('/flights');
        // const data = await fetch('http://localhost:5001/flights/' + id,
        // {
        //     method : "DELETE"
        // })
        // .then(res=>res.json());
   
        // // setFlight(flight => flight.filter(flight => flight._id !== data.result._id));
        // console.log("inside DELETE!");
        
    }

    return ( 
    <div>
        {flight &&
    <table>
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

    <button onClick={()=>{if(window.confirm('Are you sure you wish to delete this item?')) deleteFlight()}} >
        DELETE
        </button>

        <Link to={`/flights/updateflight/${flight._id}`}>
            <button>Update</button>

        </Link>
    </div>
     );
}
 
export default FlightDetails;