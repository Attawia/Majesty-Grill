import {React,useState} from 'react'
import Try from './Try';
import './Popup.css'

function Popup(props){
    const [clicked,setClicked]=useState(false);
    const click =()=>{
        setClicked(true);
    }
  
    const [flightType,setFlightType] = useState(props.flightType);
    console.log(flightType);


    return(props.trigger) ? (
        <div>
            {!clicked && <div className="popup">
               <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>   
                <h4 id="details">Flight details</h4>
                <h6 id="number">Flight number:  {props.flight.flightNo}</h6>
                <h6 id="departureBgad">Departure time:  {props.flight.departureTime}</h6>
                <h6 id="arrivalBgad">Arrival time:  {props.flight.arrivalTime}</h6>
                <h6 id="duration">Flight duration:  {props.flight.tripDuration} Hours</h6>
                <h6 id="depAirport">Departure airport:  {props.flight.depAirport}</h6>
                <h6 id="arrAirport">Arrival airport: {props.flight.arrAirport}</h6>
                <h6 id="baggage">Baggage allowance:  {props.flight.baggageAllowance}</h6>
                <button className="business-seat">Reserve Business Seat</button>       
                <button className="economy-seat">Reserve Economy Seat</button>     
                </div> 
            </div>}
            {clicked}
            </div>

    ) :"";
    
}

export default Popup