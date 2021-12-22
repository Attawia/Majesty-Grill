import { useState, useEffect} from "react";
import axios from "axios";
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {Link, useLocation} from "react-router-dom";
import Popup from './../Popup.js'
import {getUsername} from './../../api/auth.js'

let flag=false;
const UserSearch = () => {


    const [displayNumberOfAdullts,setDisplayNumberOfAdullts] = useState(1);
    const [displayNumberOfChildren,setDisplayNumberOfChildren] = useState(0);

    const [cabinClass,setCabinClass] = useState('');
    const [buttonPopup, setButtonPopup ] = useState(false);
    const [passedFlight, setPassedFlight ] = useState();

    const [criteria,setCriteria] = useState();
    const [wholeCriteria,setWholeCriteria] = useState({adultsNo: 1,childrenNo: 0, criteria: criteria});

    const[searchedFlights,setSearchedFlights] = useState([]);

    let criteriaReady = false;
    let flightType = 'dep'

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

    const handleSearchButton = async(e) => {
        const res = await axios.post('http://localhost:5000/flights/searchFlightsUser',wholeCriteria);
        return res.data;
    }

    const showSearchedFlights = (e) =>{
        e.preventDefault();

        Object.keys(criteria).forEach(function(key){
            if (criteria[key] === '') {
              delete criteria[key];
            }
        });

        // console.log(criteriaReady);
        // console.log(criteria);
        console.log(wholeCriteria);

        const searchedflights = async ()=>{const promise = await handleSearchButton(); return promise;}
        const flightsarr = searchedflights();
        flightsarr.then(function(result){
            for(let i = 0;i<result.length;i++){
                if(result[i].freeEconomySeats < wholeCriteria['adultsNo'] && result[i].freeEconomySeats < wholeCriteria['childrenNo']){
                    result.splice(i,1);
                }
            }
            setSearchedFlights(result);
            console.log(result);
            console.log(searchedFlights);
        })
    }

    function openPopUp(flightNo){

        let neededFlight = searchedFlights[0];
        for(let i = 0;i < searchedFlights.length;i++){
            if(searchedFlights[i].flightNo === flightNo){
                neededFlight = searchedFlights[i];
                console.log(neededFlight);
            }
        }
        setButtonPopup(true);
        setPassedFlight(neededFlight);

    }

    const showAllReservations = async() =>{
        return await getUsername();
    }

    //wait for variable to change
    useEffect(() => {
        setWholeCriteria({...wholeCriteria, adultsNo : displayNumberOfAdullts});

    }, [displayNumberOfAdullts]);

    //wait for variable to change
    useEffect(() => {
        setWholeCriteria({...wholeCriteria, childrenNo : displayNumberOfChildren});

    }, [displayNumberOfChildren]);

    useEffect(() => {
        setWholeCriteria({...wholeCriteria, criteria : criteria});

    }, [criteria]);

    // useEffect(() => {
    //     for(let i = 0;i<searchedFlights.length;i++){
    //         if(searchedFlights[i].flightNo === "bbb"){
    //             searchedFlights.splice(i,1);
    //         }
    //     }

    // }, [searchedFlights]);


    return (
        <div>
            <div>
         

        </div>
        <div className="home">
            <Link to={`/`}>
                <button>
                    Sign Out 
                </button>
            </Link>
            <p>      </p>
            <Link to={`/users/profile/`}>
                <button>
                    View My Profile 
                </button>
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link to={`/allReservations`}>
                <button>
                    View All My Reservations 
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
            onChange={(e) => {setCriteria({...criteria, depAirport : e.target.value})}}
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
            onChange={(e) => setCabinClass(e.target.value)}
            />
            <h2></h2>
            <br></br>
            <button>Search Flights</button>
        </form>
          {searchedFlights.map(depFlight => (
              <Link to={{ 
                pathname: "/Popup/" ,
                state : {depFlight,flightType,displayNumberOfAdullts,displayNumberOfChildren}
                }}>
                <div className="flights-preview" key={depFlight.flightNo}>
                    <h2>{depFlight.flightNo}</h2>
                    <h4>{ depFlight.depAirport} ===={">"} { depFlight.arrAirport} </h4>
                    <h3>Price:  {depFlight.priceEconomy}€    ~    {depFlight.priceBusiness}€</h3>
                </div>
            </Link>
          ))}


        </div>
        {console.log(displayNumberOfAdullts)}
        {console.log(displayNumberOfChildren)}
        </div>
    );
      
  
}


export default UserSearch;

