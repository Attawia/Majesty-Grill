import {React,useEffect,useState} from 'react'
import Try from './Try';
import {Link, useLocation,useHistory} from "react-router-dom";
import './Popup.css'
import {FaSearch,FaPlus,FaMinus,FaPlaneDeparture,FaPlaneArrival,FaPlane,FaLuggageCart,FaRegCalendarAlt} from "react-icons/fa"

let aloo2 = false;
let aloo = false;
function Popup(props){
    const history = useHistory();
    const location = useLocation();
    let {depFlight} = location.state;
    let {retFlight} = location.state;
    let {reservation} = location.state;

    const[depFlightState,setDepFlightState] = useState();
    const[retFlightState,setRetFlightState] = useState();
    const[reservationState,setReservationStatee] = useState();

useEffect(()=>{
    
    console.log(depFlight);
    console.log(retFlight);
    console.log(reservation);


},[depFlight,retFlight,reservation]);

const retBusiness=()=>{
    console.log("ayhaga");
    reservation = {...reservation,cabinReturn:'Business'};
    console.log(retFlight);
    history.push({ 
        pathname: "/Summary" ,
        state : {depFlight,retFlight,reservation}
        });
}
const retEco=()=>{
    reservation = {...reservation,cabinReturn:'Economy'};
    history.push({ 
        pathname: "/Summary" ,
        state : {depFlight,retFlight,reservation}
        });
}

    return(
        <div>
           
             <div className="popup">
               <div className="popup-inner">
                <button className="close-btn" onClick={() => history.go(-1)}>Close</button>   
                <h4 id="details"><FaPlane/> Flight details</h4>
                <h6 id="number">Flight number:  {retFlight.flightNo}</h6>
                <h6 id="departureBgad">Departure time: <FaRegCalendarAlt/>  {retFlight.departureTime.substring(0,10)}  {retFlight.departureTime.substring(11,16)}</h6>
                <h6 id="arrivalBgad">Arrival time: <FaRegCalendarAlt/>  {retFlight.arrivalTime.substring(0,10)}  {retFlight.arrivalTime.substring(11,16)}</h6>
                <h6 id="duration">Flight duration:  {retFlight.tripDuration} Hours</h6>
                <h6 id="depAirport"><FaPlaneDeparture/>  {retFlight.depAirport}</h6>
                <h6 id="arrAirport"><FaPlaneArrival/>  {retFlight.arrAirport}</h6>
                <h6 id="baggage"><FaLuggageCart/> Baggage allowance:  {retFlight.baggageAllowance}</h6>
                <h6 id="priceEconomy">{Math.floor(retFlight.priceEconomy)}€/Seat</h6>
                <h6 id="priceBusiness">{Math.floor(retFlight.priceBusiness)}€/Seat</h6>

                <button className="business-seat"onClick={retBusiness}>Reserve Business</button>       
                <button className="economy-seat"onClick={retEco}>Reserve Economy</button>   
                </div> 
                </div>
            
        </div>

    );
    
}

export default Popup