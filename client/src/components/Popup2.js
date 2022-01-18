import {React,useEffect,useState} from 'react'
import Try from './Try';
import {Link, useLocation,useHistory} from "react-router-dom";
import './Popup.css'

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
                <button className="close-btn" onClick={() => history.go(-1)}>close</button>   
                <h4 id="details">Flight details</h4>
                <h6 id="number">Flight number:  {retFlight.flightNo}</h6>
                <h6 id="departureBgad">Departure time:  {retFlight.departureTime}</h6>
                <h6 id="arrivalBgad">Arrival time:  {retFlight.arrivalTime}</h6>
                <h6 id="duration">Flight duration:  {retFlight.tripDuration} Hours</h6>
                <h6 id="depAirport">Departure airport:  {retFlight.depAirport}</h6>
                <h6 id="arrAirport">Arrival airport: {retFlight.arrAirport}</h6>
                <h6 id="baggage">Baggage allowance:  {retFlight.baggageAllowance}</h6>
                <h6 id="priceEconomy">{retFlight.priceEconomy}€/Seat</h6>
                <h6 id="priceBusiness">{retFlight.priceBusiness}€/Seat</h6>

                <button className="business-seat"onClick={retBusiness}>Reserve Business</button>       
                <button className="economy-seat"onClick={retEco}>Reserve Economy</button>   
                </div> 
                </div>
            
        </div>

    );
    
}

export default Popup