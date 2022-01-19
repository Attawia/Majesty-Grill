import { useState, useEffect} from "react";
import axios from "axios";
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {Link, useLocation} from "react-router-dom";
import Popup from './../Popup.js'
import {FaSearch,FaPlus,FaMinus,FaPlaneDeparture,FaPlaneArrival,FaPlane,FaRegCalendarAlt} from "react-icons/fa"
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Footer/Footer.js';

const UserSearchReturn = () => {

    const location = useLocation();
    const {depFlight} = location.state;
    //const depFlight = {departureTime:"2021-12-11T16:03:00.000+00:00", depAirport:"aaaa", arrAirport:"bbbb"};
    const {reservation} = location.state;
    //const reservation = {};

    const [buttonPopup, setButtonPopup ] = useState(false);

    const[resultedFlights,setResultedFlights] = useState([]);
    const [passedFlight, setPassedFlight ] = useState();

    const handleSearchReturnFlights = async(e) => {
        const res = await axios.post('http://localhost:5000/flights/searchReturnFlightsUser',depFlight);
        return res.data;
    }


    useEffect(() => {
        const searchedflights = async ()=>{const promise = await handleSearchReturnFlights(); return promise;}
        const flightsarr = searchedflights();
        flightsarr.then(function(result){
            setResultedFlights(result);
        })
    }, []);

    useEffect(() => {
        console.log(depFlight);
        console.log(reservation);
    }, [depFlight,reservation]);

    function openPopUp(flightNo){

        let neededFlight = resultedFlights[0];
        for(let i = 0;i < resultedFlights.length;i++){
            if(resultedFlights[i].flightNo === flightNo){
                neededFlight = resultedFlights[i];
                console.log(neededFlight);
            }
        }
        setButtonPopup(true);
        console.log(buttonPopup);
        setPassedFlight(neededFlight);


    }

    return(
        <div>
            <Navbar/>
            <Link to={`/UserSearch`}>
                <button>Back</button>
            </Link>
            <h6>Return Flights  <FaPlaneArrival/></h6>
            
            {resultedFlights.map(retFlight => (
                <Link to={{ 
                    pathname: "/Popup2/" ,
                    state : {depFlight,retFlight,reservation}
                    }}>
            <div className="flights-preview" key={retFlight.flightNo}>
                <h2 className="flight-number"><FaRegCalendarAlt/> {retFlight.departureTime.substring(0,10)}</h2>
                <h2><FaPlaneDeparture/> { retFlight.depAirport}     {retFlight.departureTime.substring(11,16)}</h2>
                <h2><FaPlaneArrival/> { retFlight.arrAirport}     {retFlight.arrivalTime.substring(11,16)}</h2>
                <h3>Price:  {Math.floor(retFlight.priceEconomy)}€    ~    {Math.floor(retFlight.priceBusiness)}€</h3>
            </div>
             </Link>
          ))}
          <div>
          {console.log('here')}
          {buttonPopup && <Popup 
            trigger={buttonPopup} 
            setTrigger={setButtonPopup} 
            depFlight = {depFlight}
            retFlight = {passedFlight}
            flightType = {"ret"}
            reservation = {reservation}
            flag = {true}
            />
          }
          
          </div>

        </div>
    );

}

export default UserSearchReturn;