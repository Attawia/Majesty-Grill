import {React,useEffect,useState} from 'react'
import Try from './Try';
import {Link, useLocation,useHistory} from "react-router-dom";
import './Popup.css'

let aloo2 = false;
let aloo = false;
function Popup(props){
    const history = useHistory();
    const location = useLocation();
    const {depFlight} = location.state;
    const {flightType} = location.state;
    const {displayNumberOfAdullts} = location.state;
    const {displayNumberOfChildren} = location.state;

    //const[aloo,setAloo] = useState(false);
    //const [depFlight,setDepFlight]=useState();
   // const [depFlight,setdepFlight] = useState(props.depFlight);
    const [retFlight,setretFlight] = useState();
    let reservation ={}
   
    const [passengersNo,setPassengersNo] = useState(0)

    const [flag,setFlag] = useState(false)
       
     //   setreservation({Passengers:passengersNo});
        
    useEffect(()=>{

        console.log(passengersNo);
        
        console.log(depFlight);
   
    console.log(flightType);
    console.log(aloo);
    //setDepFlight(depFlight);
    setPassengersNo(displayNumberOfAdullts + displayNumberOfChildren);

        if ( flightType == 'ret')
    {
        setFlag(false)
        setretFlight(props.retFlight);
        //setreservation(props.reservation);
        
        console.log(retFlight);
        aloo = true;
    }

    

    if (flightType == 'dep')
           { 
            setFlag(true)
           }

           console.log(flag)
           console.log(depFlight)
           console.log(passengersNo)
    
},[flightType,depFlight,displayNumberOfAdullts,displayNumberOfChildren]);

useEffect(()=>{


    if ( flightType == 'ret')
{
    setFlag(false)
    setretFlight(props.retFlight);
    //setreservation(props.reservation);
    
    console.log(retFlight);
    aloo = true;
}



if (flightType == 'dep')
       { 
        setFlag(true)
        reservation = {passengers: passengersNo}
       }

       console.log(flag)
       console.log(depFlight)
       console.log(passengersNo)
       console.log(reservation)

},[depFlight,passengersNo]);

const depEco=()=>{
    reservation = {...reservation,cabinDeparture:'Economy'};
    history.push({ 
        pathname: "/UserSearchReturn" ,
        state : {depFlight,reservation}
        });
}
const depBusiness=()=>{
    reservation = {...reservation,cabinDeparture:'Business'};
    console.log(depFlight);
    history.push({ 
        pathname: "/UserSearchReturn" ,
        state : {depFlight,reservation}
        });
}
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
            {flag && <div className="popup">
               <div className="popup-inner">
                <button className="close-btn" onClick={() => history.go(-1)}>close</button>   
                <h4 id="details">Flight details</h4>
                <h6 id="number">Flight number:  {depFlight.flightNo}</h6>
                <h6 id="departureBgad">Departure time:  {depFlight.departureTime}</h6>
                <h6 id="arrivalBgad">Arrival time:  {depFlight.arrivalTime}</h6>
                <h6 id="duration">Flight duration:  {depFlight.tripDuration} Hours</h6>
                <h6 id="depAirport">Departure airport:  {depFlight.depAirport}</h6>
                <h6 id="arrAirport">Arrival airport: {depFlight.arrAirport}</h6>
                <h6 id="baggage">Baggage allowance:  {depFlight.baggageAllowance}</h6>
                <h6 id="priceEconomy">{depFlight.priceEconomy}€/Seat</h6>
                <h6 id="priceBusiness">{depFlight.priceBusiness}€/Seat</h6>
                
                <button className="business-seat" onClick={depBusiness}>Reserve Business</button>  
                <button className="economy-seat" onClick={depEco}>Reserve Economy</button>
                 

                </div> 
                </div>
            }
            {/* {!flag && <div className="popup">
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
            } */}
        </div>

    );
    
}

export default Popup