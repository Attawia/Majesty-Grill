import { useState } from "react";
import axios from "axios";
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {Link} from "react-router-dom";

const getFlights = async()=>{
    const res = await axios.get('http://localhost:5000/flights/');
    return res.data;
}

const Home = () => {

    const[flights,setFlights] = useState([]);

    const [criteria,setCriteria] = useState();

    const[searchedFlights,setSearchedFlights] = useState([]);

    const handleSearchButton = async(e) => {
        const res = await axios.post('http://localhost:5000/flights/searchFlights',criteria);
        return res.data;
    }

   const showAll = (e) =>{
    e.preventDefault();
    const newflights = async ()=>{const promise = await getFlights(); return promise;}
    const flightsarr = newflights();
    flightsarr.then(function(result){
        setFlights(result);
    })}

    const showSearchedFlights = (e) =>{
        e.preventDefault();
        const searchedflights = async ()=>{const promise = await handleSearchButton(); return promise;}
        const flightsarr = searchedflights();
        flightsarr.then(function(result){
            setSearchedFlights(result);
        })}

    return (
        <div className="home">
        <form onSubmit={showSearchedFlights}>
            <label>Flight Number:      </label>
            <TextField 
            type="text"
            name="Flight Number"
            onChange={(e) => setCriteria({...criteria, flightNo : e.target.value})}
            />
            <label>      Departure Time:      </label>
            <TextField
            type="datetime-local"
            name="Departure Time"
            onChange={(e) => setCriteria({...criteria, departureTime : e.target.value})}
            />
            <label>      Arrival Time:      </label>
            <TextField
            type="datetime-local"
            name="Arrival Time"
            onChange={(e) => setCriteria({...criteria, arrivalTime : e.target.value})}
            />
            <label>      Economy Seats:      </label>
            <TextField
            type="text"
            name="Economy Seats"
            onChange={(e) => setCriteria({...criteria, economySeats : e.target.value})}
            />
            <h2></h2>
            <label>Business Seats:     </label>
            <TextField
            type="text"
            name="Business Seats"
            onChange={(e) => setCriteria({...criteria, businessSeats : e.target.value})}
            />
            <label>      First Class Seats:      </label>
            <TextField
            type="text"
            name="First Class Seats"
            onChange={(e) => setCriteria({...criteria, firstSeats : e.target.value})}
            />
            <label>      Departure Airport:      </label>
            <TextField
            type="text"
            name="Departure Airport"
            onChange={(e) => setCriteria({...criteria, depAirport : e.target.value})}
            />
            <label>      Arrival Airport:      </label>
            <TextField
            type="text"
            name="Arrival Airport"
            onChange={(e) => setCriteria({...criteria, arrAirport : e.target.value})}
            />
            <h2></h2>
            <button>Search Flights</button>
        </form>
           <button onClick= {showAll}>Show All Flights</button>
          {flights.map(flight => (
              <Link to={`/flights/${flight._id}`}>
            <div className="flights-preview" key={flight._id} >
                <h2>{flight.flightNo}</h2>
                <p>{ flight.depAirport} =={">"} { flight.arrAirport} </p>
            </div>
            </Link>
          ))}
          {searchedFlights.map(searchedFlight => (
            <div className="flights-preview" key={searchedFlight._id} >
                <h2>{searchedFlight.flightNo}</h2>
                <p>{ searchedFlight.depAirport} =={">"} { searchedFlight.arrAirport} </p>
            </div>
          ))}
        </div>
    );
      
  
}


  export default Home;