import {React,useEffect,useState} from 'react'
import {Link, useLocation,useHistory} from "react-router-dom";
import '../Popup.css'
import axios from "axios";

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

        let price = flight.priceBusiness * reservation.passengers
        let difference = (flight.priceBusiness * reservation.passengers) - reservation.priceDeparture;
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

        let price = flight.priceEconomy * reservation.passengers
        let difference = (flight.priceEconomyce * reservation.passengers) - reservation.priceDeparture;
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
        let difference = (flight.priceBusiness * reservation.passengers) - reservation.priceReturn;
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
        let difference = (flight.priceEconomy * reservation.passengers) - reservation.priceReturn;
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
                    <h4 id="details">Flight details</h4>
                    <h6 id="number">Flight number:  {flight.flightNo}</h6>
                    <h6 id="departureBgad">Departure time:  {flight.departureTime}</h6>
                    <h6 id="arrivalBgad">Arrival time:  {flight.arrivalTime}</h6>
                    <h6 id="duration">Flight duration:  {flight.tripDuration} Hours</h6>
                    <h6 id="depAirport">Departure airport:  {flight.depAirport}</h6>
                    <h6 id="arrAirport">Arrival airport: {flight.arrAirport}</h6>
                    <h6 id="baggage">Baggage allowance:  {flight.baggageAllowance}</h6>
                    <h6 id="priceDifference">Price Difference:</h6>
                    <h6 id="priceEconomy">{flight.priceEconomy - (reservation.priceDeparture/reservation.passengers)}€/Seat</h6>
                    <h6 id="priceBusiness">{flight.priceBusiness - (reservation.priceDeparture/reservation.passengers)}€/Seat</h6>

                    <button className="business-seat"onClick={depBusiness}>Reserve Business</button>       
                    <button className="economy-seat"onClick={depEco}>Reserve Economy</button>   
                </div> 
            </div>}

            { !flagType && <div className="popup">
                <div className="popup-inner">
                    <button className="close-btn" onClick={() => history.go(-1)}>Close</button>   
                    <h4 id="details">Flight details</h4>
                    <h6 id="number">Flight number:  {flight.flightNo}</h6>
                    <h6 id="departureBgad">Departure time:  {flight.departureTime}</h6>
                    <h6 id="arrivalBgad">Arrival time:  {flight.arrivalTime}</h6>
                    <h6 id="duration">Flight duration:  {flight.tripDuration} Hours</h6>
                    <h6 id="depAirport">Departure airport:  {flight.depAirport}</h6>
                    <h6 id="arrAirport">Arrival airport: {flight.arrAirport}</h6>
                    <h6 id="baggage">Baggage allowance:  {flight.baggageAllowance}</h6>
                    <h6 id="priceDifference">Price Difference:</h6>
                    <h6 id="priceEconomy">{flight.priceEconomy - (reservation.priceReturn/reservation.passengers)}€/Seat</h6>
                    <h6 id="priceBusiness">{flight.priceBusiness - (reservation.priceReturn/reservation.passengers)}€/Seat</h6>

                    <button className="business-seat"onClick={retBusiness}>Reserve Business</button>       
                    <button className="economy-seat"onClick={retEco}>Reserve Economy</button>   
                </div> 
            </div>}
            
        </div>

    );
    
}

export default PopupEditReservation