import { useState, useEffect} from "react";
import './Summary.css'
import axios from "axios";
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {Link,useLocation,useHistory} from "react-router-dom";
import Try from './Try';
import {isGuest} from '../api/auth.js';

function Summary(props){
    const history = useHistory();
    const location = useLocation();
    const {depFlight} = location.state;
    const {retFlight} = location.state;
    const {reservation} = location.state;

    const [depCabin,setDepCabin] = useState("");
    const [retCabin,setRetCabin] = useState("");
    const [depPrice,setDepPrice] = useState(0);
    const [retPrice,setRetPrice] = useState(0);
    const [totalPriceFinal,setTotalPriceFinal] = useState(0);
    const [user,setUser] = useState(false);

    const [loggedIN, setLogged] = useState(true);

    const guestUserCheck = async () => {

        const guestUser = await isGuest();
        console.log(guestUser);
        if(guestUser){setLogged(false)};

    }

    //if guest ? go to sign in and then proceed to payment then seating
    const fakeSignIn = () => {

        history.push({ 
            pathname: "/SignInForm2/" ,
            state : {depFlight,retFlight,reservation}
        });

        window.location.reload();
    }


    useEffect(()=>
    {
     const getTheUser = async () =>
     {
        const theUser = await isGuest(); 
        setUser(!theUser);
     }     
        getTheUser();

        //choosing the right button to preview according to the status of the user
        guestUserCheck();

    },[])

    useEffect(()=>
    {
        console.log('guest: '+!user);
        
    },[user])



    useEffect(() => {
    console.log('hena');
    console.log(retFlight);
    console.log('hena');
    if (reservation.cabinDeparture == "Economy")
    {
        setDepPrice(depFlight.priceEconomy * reservation.passengers);
        setDepCabin("Economy");
    }
    else
    {
        setDepPrice(depFlight.priceBusiness * reservation.passengers);
        setDepCabin("Business");
    }

    if (reservation.cabinReturn == "Economy")
    {
        setRetPrice(depFlight.priceEconomy * reservation.passengers);
        setRetCabin("Economy");
    }
    else
    {
        setRetPrice(depFlight.priceBusiness * reservation.passengers);
        setRetCabin("Business");
    }
    setTotalPriceFinal(depPrice + retPrice);
    }, [depFlight,retFlight,reservation]);
    
    const chooseSeats=()=>{
        let priceDepFlight = 0;
        let priceRetFlight = 0;
        if(reservation.cabinDeparture == 'Economy'){
            if(reservation.cabinReturn == 'Economy'){
                priceDepFlight = depFlight.priceEconomy
                priceRetFlight = retFlight.priceEconomy
            }
            else{
                priceDepFlight = depFlight.priceEconomy
                priceRetFlight = retFlight.priceBusiness
            }
        }
        else{
            if(reservation.cabinReturn == 'Economy'){
                priceDepFlight = depFlight.priceBusiness
                priceRetFlight = retFlight.priceEconomy
            }
            else{
                priceDepFlight = depFlight.priceBusiness
                priceRetFlight = retFlight.priceBusiness
            }
        }
        let price = (priceDepFlight * reservation.passengers) + (priceRetFlight * reservation.passengers);
        let to = "/departureSeats/";

        history.push({ 
            pathname: "/payment" ,
            state : {depFlight,retFlight,reservation,price,to}
        });
    }
    
    return(
        <div className="Summary">
            {/* <button className="return" onClick={history.go(-1)}>Back</button>  */}
            <h1 id="flightSummary">Flight Summary</h1>
            <h2 id="departure">Departure Flight:</h2>
            <h2 id="arrival">Return Flight:</h2>

            <h6 id="depNum">Flight number: {depFlight.flightNo}</h6>
            <h6 id="depDepTime">Flight Departure Time: {depFlight.departureTime}</h6>
            <h6 id="depArrTime">Flight Arrival Time: {depFlight.arrivalTime}</h6>
            <h6 id="depPrice">Price: {depPrice}€</h6>
            <h6 id="depCabin">Cabin: {depCabin}</h6>

            <h6 id="arrNum">Flight number: {retFlight.flightNo}</h6>
            <h6 id="arrDepTime">Flight Departure Time: {retFlight.departureTime}</h6>
            <h6 id="arrArrTime">Flight Arrival Time: {retFlight.arrivalTime}</h6>
            <h6 id="arrPrice">Price: {retPrice}€</h6>
            <h6 id="arrCabin">Cabin: {retCabin}</h6>

            <h6 id="totalPrice">Total Price: {depPrice + retPrice}€</h6>

            
            {loggedIN && <button className="confirm-disha" onClick={chooseSeats}>Proceed to seating</button>}
            {!loggedIN && <button className="confirm-disha" onClick={fakeSignIn}>Sign in and proceed to seating</button>}
            

            </div>
    );
}
export default Summary