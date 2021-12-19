import {React,useState} from 'react'
import Try from './Try';
import {Link, useLocation,useHistory} from "react-router-dom";
import './Popup.css'

function Popup(props){
    const history = useHistory();
    const [clicked,setClicked]=useState(false);
    const click =()=>{
        setClicked(true);
    }
  
    const [flightType,setFlightType] = useState(props.flightType);
    console.log(flightType);
    let passengersNo = props.adultNo + props.childrenNo;

    const [depFlight,setdepFlight] = useState(props.depFlight);
    const [retFlight,setretFlight] = useState();
    const [reservation,setreservation] = useState({passengers:passengersNo});

    let flag = true;

    if ( flightType == 'ret')
    {
            flag = false;
        setretFlight(props.retFlight);
        setreservation(props.reservation);
    }

    if (flightType == 'dep')
           { 
            flag = true; 
           }
    const depEco=()=>{
        setreservation({...reservation,cabinDeparture:'Economy'});
        history.push({ 
            pathname: "/UserSearchReturn/" ,
            state : depFlight,reservation
            });
    }
    const depBusiness=()=>{
        setreservation({...reservation,cabinDeparture:'Business'});
        history.push({ 
            pathname: "/UserSearchReturn/" ,
            state : depFlight,reservation
            });
    }
    const retBusiness=()=>{
        setreservation({...reservation,cabinReturn:'Business'});
        history.push({ 
            pathname: "/Summary" ,
            state : depFlight,retFlight,reservation
            });
    }
    const retEco=()=>{
        setreservation({...reservation,cabinReturn:'Economy'});
        history.push({ 
            pathname: "/Summary" ,
            state : depFlight,retFlight,reservation
            });
    }

    return(props.trigger) ? (
        <div>
            {flag && <div className="popup">
               <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>   
                <h4 id="details">Flight details</h4>
                <h6 id="number">Flight number:  {props.depFlight.flightNo}</h6>
                <h6 id="departureBgad">Departure time:  {props.depFlight.departureTime}</h6>
                <h6 id="arrivalBgad">Arrival time:  {props.depFlight.arrivalTime}</h6>
                <h6 id="duration">Flight duration:  {props.depFlight.tripDuration} Hours</h6>
                <h6 id="depAirport">Departure airport:  {props.depFlight.depAirport}</h6>
                <h6 id="arrAirport">Arrival airport: {props.depFlight.arrAirport}</h6>
                <h6 id="baggage">Baggage allowance:  {props.depFlight.baggageAllowance}</h6>
                <h6 id="priceEconomy">{props.depFlight.priceEconomy}€/Seat</h6>
                <h6 id="priceBusiness">{props.depFlight.priceBusiness}€/Seat</h6>
                
                <button className="business-seat" onClick={depBusiness}>Reserve Business</button>  
                <button className="economy-seat" onClick={depEco}>Reserve Economy</button>
                 

                </div> 
                </div>
            }
            {!flag && <div className="popup">
               <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>   
                <h4 id="details">Flight details</h4>
                <h6 id="number">Flight number:  {props.retFlight.flightNo}</h6>
                <h6 id="departureBgad">Departure time:  {props.retFlight.departureTime}</h6>
                <h6 id="arrivalBgad">Arrival time:  {props.retFlight.arrivalTime}</h6>
                <h6 id="duration">Flight duration:  {props.retFlight.tripDuration} Hours</h6>
                <h6 id="depAirport">Departure airport:  {props.retFlight.depAirport}</h6>
                <h6 id="arrAirport">Arrival airport: {props.retFlight.arrAirport}</h6>
                <h6 id="baggage">Baggage allowance:  {props.retFlight.baggageAllowance}</h6>
                <h6 id="priceEconomy">{props.retFlight.priceEconomy}€/Seat</h6>
                <h6 id="priceBusiness">{props.retFlight.priceBusiness}€/Seat</h6>

                <button className="business-seat"onClick={retBusiness}>Reserve Business</button>       
                <button className="economy-seat"onClick={retEco}>Reserve Economy</button>   
                </div> 
                </div>
            }
        </div>

    ) :"";
    
}

export default Popup