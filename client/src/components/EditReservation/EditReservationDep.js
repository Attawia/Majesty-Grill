import { useState, useEffect} from "react";
import axios from "axios";
import {TextField,Button,Paper,Typography, CircularProgress} from '@material-ui/core';
import {Link, useLocation,useHistory} from "react-router-dom";
import Popup from './../Popup.js'
import {getUsername} from './../../api/auth.js'
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Footer/Footer.js';

let flag=false;
const EditReservationDep = () => {
    const history = useHistory();
    const location = useLocation();

    //dool 3shan el test
    /*const [reservation,setReservation] = useState({
        timeReturn:"2025-12-11T16:03:00.000Z", 
        priceDeparture:400, 
        passengers:2,
        timeDeparture:"2020-12-11T16:03:00.000Z",
        priceReturn:400,
        from:"JFK",
        to:"LAX"
    });
    
    const [type,setType] = useState('Departure');*/


    //hakhod el data mn ziko hena fi variable esmo reservation
    const {reservation} = location.state;
    const {type} = location.state;

    //true --> Departure
    //false --> Return
    const [flagType,setFlagType] = useState(true);

    const [cabinClass,setCabinClass] = useState('');

    const [criteria,setCriteria] = useState({departureTime:''});

    const[searchedFlights,setSearchedFlights] = useState([]);

    //wait for variable to change
    useEffect(() => {
        if(type === 'Departure'){
            setFlagType(true);
            setCriteria({...criteria, type : 'Departure',timeRes : reservation.timeReturn, depAirport: reservation.from, arrAirport: reservation.to});
        }
        else{
            setFlagType(false);
            setCriteria({...criteria, type : 'Return', timeRes : reservation.timeDeparture, depAirport: reservation.to, arrAirport: reservation.from});
        }

    }, [type,reservation]);
    
    const handleSearchButton = async(e) => {
        const res = await axios.post('http://localhost:5000/flights/editReservationDep',criteria);
        return res.data;
    }

    const showSearchedFlights = (e) =>{
       
         e.preventDefault();
         let depDate = Date.parse(criteria.departureTime);
         let retDate = Date.parse(reservation.timeReturn);

         if(type === 'Departure'){
            if(depDate > retDate){
                setSearchedFlights([]);
                window.confirm("Please choose a Date before your Return Flight Date");
            }
            else{

                const searchedflights = async ()=>{const promise = await handleSearchButton(); return promise;}
                const flightsarr = searchedflights();
                flightsarr.then(function(result){
        
                    setSearchedFlights(result);
                })
            }
         }
         else{
            retDate = Date.parse(reservation.timeDeparture);

            if(depDate < retDate){
                setSearchedFlights([]);
                window.confirm("Please choose a Date After your Departure Flight Date");
            }
            else{
                const searchedflights = async ()=>{const promise = await handleSearchButton(); return promise;}
                const flightsarr = searchedflights();
                flightsarr.then(function(result){
        
                    setSearchedFlights(result);
                })
            }
         }

        
    }

    const showAllReservations = async() =>{
        return await getUsername();
    }


    return (
        <div>
            <Navbar/>
            <Link to={`/UserSearch`}>
                <button>Back</button>
            </Link>
            <div>
         

        </div>
        <div className="home">
            <p>      </p>
            <h1>Edit Departure Flight</h1> 
        <form onSubmit={showSearchedFlights}>

            {flagType && <label>      Departure Time:      </label>}
            {!flagType && <label>      Return Time:      </label>}

            <TextField
            type="date"
            name="Departure Time"
            onChange={(e) => setCriteria({...criteria, departureTime : e.target.value+''+'T00:00:00.000Z'})}
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
          { flagType && searchedFlights.map(flight => (
              <Link to={{ 
                pathname: "/PopupEditReservation/" ,
                state : {flight,type,reservation}//hahot hena el flight elly howa ekhtarha
                }}>
                <div className="flights-preview" key={flight.flightNo}>
                    <h2>{flight.flightNo}</h2>
                    <h4>{ flight.depAirport} ===={">"} { flight.arrAirport} </h4>
                    <h3>Price Difference:  ({Math.max(0,Math.floor(flight.priceEconomy - (reservation.priceDeparture/reservation.passengers)))})€    ~    ({Math.max(0,Math.floor(flight.priceBusiness - (reservation.priceDeparture/reservation.passengers)))})€</h3>
                </div>
            </Link>
          ))}

            { !flagType && searchedFlights.map(flight => (
              <Link to={{ 
                pathname: "/PopupEditReservation/" ,
                state : {flight,type,reservation}//hahot hena el flight elly howa ekhtarha
                }}>
                <div className="flights-preview" key={flight.flightNo}>
                    <h2>{flight.flightNo}</h2>
                    <h4>{ flight.depAirport} ===={">"} { flight.arrAirport} </h4>
                    <h3>Price Difference:  ({Math.max(0,Math.floor(flight.priceEconomy - (reservation.priceReturn/reservation.passengers)))})€    ~    ({Math.max(0,Math.floor(flight.priceBusiness - (reservation.priceReturn/reservation.passengers)))})€</h3>
                </div>
            </Link>
          ))}
          
        </div>
        </div>
    );
      
  
}


export default EditReservationDep;

