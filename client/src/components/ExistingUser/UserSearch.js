import { useState, useEffect} from "react";
import axios from "axios";
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {Link} from "react-router-dom";

let flag=false;
const Home = () => {

    const [displayNumberOfAdullts,setDisplayNumberOfAdullts] = useState(1);
    const [displayNumberOfChildren,setDisplayNumberOfChildren] = useState(0);

    const [criteria,setCriteria] = useState({adultsNo: 1,childrenNo: 0});

    const[searchedFlights,setSearchedFlights] = useState([]);

    let criteriaReady = false;

    const decAdults = (e) =>{
        e.preventDefault();

        if(displayNumberOfAdullts != 1){
            setDisplayNumberOfAdullts(displayNumberOfAdullts - 1);
        }
    }

    const incAdults = (e) =>{
        e.preventDefault();

        setDisplayNumberOfAdullts(displayNumberOfAdullts + 1);
    }

    const decChildren = (e) =>{
        e.preventDefault();

        if(displayNumberOfChildren != 0){
            setDisplayNumberOfChildren(displayNumberOfChildren - 1);
        }
    }

    const incChildren = (e) =>{
        e.preventDefault();
        setDisplayNumberOfChildren(displayNumberOfChildren + 1);
    }

    const showSearchedFlights = (e) =>{
        e.preventDefault();

        Object.keys(criteria).forEach(function(key){
            if (criteria[key] === '') {
              delete criteria[key];
            }
        });

        console.log(criteriaReady);
        console.log(criteria);

    }

    //wait for variable to change
    useEffect(() => {
        setCriteria({...criteria, adultsNo : displayNumberOfAdullts});

    }, [displayNumberOfAdullts]);

    //wait for variable to change
    useEffect(() => {
        setCriteria({...criteria, childrenNo : displayNumberOfChildren});

    }, [displayNumberOfChildren]);

    // wait for whole criteria to change
    useEffect(() => {
        criteriaReady = true;

    }, [criteria]);

    return (
        
        <div className="home">
            <Link to={`/`}>
                <button>
                    Sign Out 
                </button>
            </Link>
            <h1>Flights Search</h1> 
        <form onSubmit={showSearchedFlights}>
            <label>Number of Adults:      </label>
            <Button variant="outlined" onClick={decAdults}>-</Button>
            <label >{'              '}{displayNumberOfAdullts}{'              '}</label>
            <Button variant="outlined" onClick={incAdults}>+</Button>

            <label>      Number of Children:      </label>
            <Button variant="outlined" onClick={decChildren}>-</Button>
            <label >{'              '}{displayNumberOfChildren}{'              '}</label>
            <Button variant="outlined" onClick={incChildren}>+</Button>

            <label>      Departure Airport:      </label>
            <TextField
            required
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
            <label>      Cabin Class:      </label>
            <TextField
            type="text"
            name="Cabin Class"
            onChange={(e) => setCriteria({...criteria, cabinClass : e.target.value})}
            />
            <h2></h2>
            <br></br>
            <button>Search Flights</button>
        </form>
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