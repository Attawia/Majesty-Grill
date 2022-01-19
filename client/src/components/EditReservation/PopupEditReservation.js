import {React,useEffect,useState} from 'react'
import {Link, useLocation,useHistory} from "react-router-dom";
import '../Popup.css'
import axios from "axios";
import {FaSearch,FaPlus,FaMinus,FaPlaneDeparture,FaPlaneArrival,FaPlane,FaLuggageCart,FaRegClock,FaRegCalendarAlt} from "react-icons/fa"

function PopupEditReservation(){
    const history = useHistory();
    const location = useLocation();
    let {flight} = location.state;
    let {type} = location.state;
    let {reservation} = location.state;

    //true --> Departure
    //false --> Return
    const [flagType,setFlagType] = useState(true);


    useEffect(()=>{
        if(type === 'Departure'){
            setFlagType(true);
        }
        else{
            setFlagType(false);
        }

    },[type]);

    const depBusiness=()=>{
        axios.patch("http://localhost:5000/flights/emptyseats2/",{flightNo: reservation.flightDeparture ,seats: reservation.seatDeparture});

        let price = Math.max(0,Math.floor(flight.priceBusiness * reservation.passengers))
        let difference = Math.max(0,Math.floor((flight.priceBusiness * reservation.passengers) - reservation.priceDeparture));
        reservation = {...reservation,cabinDeparture:'Business', timeDeparture: flight.departureTime, priceDeparture: price, flightDeparture: flight.flightNo};
        console.log(difference);
        if(difference > 0){
            let to = "/newflightseats"
            history.push({ 
                pathname: "/payment",
                state : {flight,type,reservation,difference,to}
            });
        }
        else{
            history.push({ 
                pathname: "/newflightseats",
                state : {flight,type,reservation}
            });
            window.location.reload();
        }
    }
    const depEco=()=>{
        axios.patch("http://localhost:5000/flights/emptyseats2/",{flightNo: reservation.flightDeparture ,seats: reservation.seatDeparture});

        let price = Math.max(0,Math.floor(flight.priceEconomy * reservation.passengers))
        let difference = Math.max(0,Math.floor((flight.priceEconomyce * reservation.passengers) - reservation.priceDeparture));
        reservation = {...reservation,cabinDeparture:'Economy', timeDeparture: flight.departureTime, priceDeparture: price, flightDeparture: flight.flightNo};
        if(difference > 0){
            let to = "/newflightseats"
            history.push({
                pathname: "/payment",
                state : {flight,type,reservation,difference,to}
            });
        }
        else{
            history.push({ 
                pathname: "/newflightseats",
                state : {flight,type,reservation}
            });
            window.location.reload();
        }
    }

    const retBusiness=()=>{
        axios.patch("http://localhost:5000/flights/emptyseats2/",{flightNo: reservation.flightReturn ,seats: reservation.seatReturn});

        let price = flight.priceBusiness * reservation.passengers
        let difference = Math.max(0,Math.floor((flight.priceBusiness * reservation.passengers) - reservation.priceReturn));
        reservation = {...reservation,cabinReturn:'Business', timeReturn: flight.departureTime, priceReturn: price, flightReturn: flight.flightNo};
        console.log(difference)
        if(difference > 0){
            let to = "/newflightseats"
            history.push({ 
                pathname: "/payment",
                state : {flight,type,reservation,difference,to}
            });
        }
        else{
            history.push({ 
                pathname: "/newflightseats",
                state : {flight,type,reservation}
            });
            window.location.reload();
        }
    }
    
    const retEco=()=>{
        axios.patch("http://localhost:5000/flights/emptyseats2/",{flightNo: reservation.flightReturn ,seats: reservation.seatReturn});

        let price = flight.priceEconomy * reservation.passengers
        let difference = Math.max(0,Math.floor((flight.priceEconomy * reservation.passengers) - reservation.priceReturn));
        reservation = {...reservation,cabinReturn:'Economy', timeReturn: flight.departureTime, priceReturn: price, flightReturn: flight.flightNo};
        if(difference > 0){
            let to = "/newflightseats"
            history.push({
                pathname: "/payment",
                state : {flight,type,reservation,difference,to}
            });
        }
        else{
            history.push({ 
                pathname: "/newflightseats",
                state : {flight,type,reservation}
            });
            window.location.reload();
        }
    }

    return(
        <div>
           
            { flagType && <div className="popup">
                <div className="popup-inner">
                    <button className="close-btn" onClick={() => history.go(-1)}>Close</button>   
                    <h4 id="details"><FaPlane/> Flight details</h4>
                    <h6 id="number">Flight number:  {flight.flightNo}</h6>
                    <h6 id="departureBgad">Departure time:  <FaRegCalendarAlt/>  {flight.departureTime.substring(0,10)}          {flight.departureTime.substring(11,16)}</h6>
                    <h6 id="arrivalBgad">Arrival time:  <FaRegCalendarAlt/>  {flight.arrivalTime.substring(0,10)}         {flight.arrivalTime.substring(11,16)}</h6>
                    <h6 id="duration">Flight duration:  {flight.tripDuration} Hours</h6>
                    <h6 id="depAirport"><FaPlaneDeparture/>  {flight.depAirport}</h6>
                    <h6 id="arrAirport"><FaPlaneArrival/> {flight.arrAirport}</h6>
                    <h6 id="baggage"><FaLuggageCart/> Baggage allowance:  {flight.baggageAllowance}</h6>
                    <h6 id="priceDifference">Price Difference:</h6>
                    <h6 id="priceEconomy">{Math.max(0,Math.floor(flight.priceEconomy - (reservation.priceDeparture/reservation.passengers)))}€/Seat</h6>
                    <h6 id="priceBusiness">{Math.max(0,Math.floor(flight.priceBusiness - (reservation.priceDeparture/reservation.passengers)))}€/Seat</h6>

                    <button className="business-seat"onClick={depBusiness}>Reserve Business</button>       
                    <button className="economy-seat"onClick={depEco}>Reserve Economy</button>   
                </div> 
            </div>}

            { !flagType && <div className="popup">
                <div className="popup-inner">
                    <button className="close-btn" onClick={() => history.go(-1)}>Close</button>   
                    <h4 id="details"><FaPlane/> Flight details</h4>
                    <h6 id="number">Flight number:  {flight.flightNo}</h6>
                    <h6 id="departureBgad">Departure time:  <FaRegCalendarAlt/>  {flight.departureTime.substring(0,10)}          {flight.departureTime.substring(11,16)}</h6>
                    <h6 id="arrivalBgad">Arrival time:  <FaRegCalendarAlt/>  {flight.arrivalTime.substring(0,10)}         {flight.arrivalTime.substring(11,16)}</h6>
                    <h6 id="duration">Flight duration:  {flight.tripDuration} Hours</h6>
                    <h6 id="depAirport"><FaPlaneDeparture/>  {flight.depAirport}</h6>
                    <h6 id="arrAirport"><FaPlaneArrival/> {flight.arrAirport}</h6>
                    <h6 id="baggage"><FaLuggageCart/> Baggage allowance:  {flight.baggageAllowance}</h6>
                    <h6 id="priceDifference">Price Difference:</h6>
                    <h6 id="priceEconomy">{Math.max(0,Math.floor(flight.priceEconomy - (reservation.priceReturn/reservation.passengers)))}€/Seat</h6>
                    <h6 id="priceBusiness">{Math.max(0,Math.floor(flight.priceBusiness - (reservation.priceReturn/reservation.passengers)))}€/Seat</h6>

                    <button className="business-seat"onClick={retBusiness}>Reserve Business</button>       
                    <button className="economy-seat"onClick={retEco}>Reserve Economy</button>   
                </div> 
            </div>}
            
        </div>

    );
    
}

export default PopupEditReservation