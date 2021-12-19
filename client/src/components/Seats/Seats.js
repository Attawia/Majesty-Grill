import axios from 'axios';
import {react,useEffect} from 'react';
import {useState} from 'react';
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import { Link,useHistory,useLocation,
} from 'react-router-dom';
import './seats.scss';
             
let final=[];
let flag=false;
let row=1;
const userName = 'Disha';
const Seat =  () => {
  const history = useHistory();
  const location = useLocation();
  const {depFlight} = location.state;
  const economy = depFlight.economySeats;
  const business = depFlight.businessSeats;
  let total = business + economy;
  let seatarray=depFlight.seats;
  const id=depFlight._id;
  const {retFlight} = location.state;
  let {reservation} = location.state;
  const limit = reservation.Passengers;
  reservation={...reservation,
  timeDeparture  : depFlight.departureTime,
  flightDeparture:depFlight.flightNo,
  timeReturn: retFlight.departureTime,
  flightReturn: retFlight.flightNo,
  bookingNumber: Math.floor(100000 + Math.random() * 900000),
  from: depFlight.depAirport,
  to: depFlight.arrAirport,
  userName: userName,};
  if(reservation.cabinDeparture=='Economy'){
    reservation.priceDeparture=depFlight.priceEconomy;
  }
  else{
    reservation.priceDeparture=depFlight.priceBusiness;
  }
  if(reservation.cabinReturn=='Economy'){
    reservation.priceDeparture=retFlight.priceEconomy;
  }
  else{
    reservation.cabinReturn=retFlight.priceBusiness;
  }
  if(!flag){
  for(let i=1;i<=economy+business;i++){
    if(i<=business && business-i+1>=6){
      if(i==1)final.push(<u><h2>Business Class</h2></u>);
      final.push(<div class="seat-row">
      <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
      <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
      <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
      <div class="aisle"><span class="aisle-number">{row}</span></div>
      <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
      <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
      <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
    </div>)
    }
    else if(i<=business && business-i+1<6){
      let seatsleft = business-i+1;
      switch(seatsleft){
        case 1 :final.push(<div class="seat-row">
                  <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
                  <div class="aisle"><span class="aisle-number">{row}</span></div>
        </div>);break;
        case 2: final.push(<div class="seat-row">
                <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
                <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
                <div class="aisle"><span class="aisle-number">{row}</span></div>
        </div>);break;
        case 3: final.push(<div class="seat-row">
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="aisle"><span class="aisle-number">{row}</span></div>        
        </div>);break;
        case 4: final.push(<div class="seat-row">
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="aisle"><span class="aisle-number">{row}</span></div>
        <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        </div>);break;
        case 5: final.push(<div class="seat-row">
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="aisle"><span class="aisle-number">{row}</span></div>
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        </div>);break;



      }
    }
    if(i>business && total-i+1>=6){
      if(i==business+1)final.push(<u><h2>Economy Class</h2></u>)
      final.push(<div class="seat-row">
      <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
      <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
      <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
      <div class="aisle"><span class="aisle-number">{row}</span></div>
      <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
      <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
      <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
    </div>)
    }
    else if(i>business && total-i+1<6){
      let seatsleft = total-i+1;
      switch(seatsleft){
        case 1 :final.push(<div class="seat-row">
                  <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
                  <div class="aisle"><span class="aisle-number">{row}</span></div>
        </div>);break;
        case 2: final.push(<div class="seat-row">
                <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
                <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
                <div class="aisle"><span class="aisle-number">{row}</span></div>
        </div>);break;
        case 3: final.push(<div class="seat-row">
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="aisle"><span class="aisle-number">{row}</span></div>        
        </div>);break;
        case 4: final.push(<div class="seat-row">
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="aisle"><span class="aisle-number">{row}</span></div>
        <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        </div>);break;
        case 5: final.push(<div class="seat-row">
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="aisle"><span class="aisle-number">{row}</span></div>
        <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
        </div>);break;
      }
    }
    row++;
  }
  document.addEventListener("DOMContentLoaded", function(event) {
    let j=1;
    if(reservation.cabinDeparture=='Economy'){
      for(let i=1;i<=business;i++){
        document.getElementById(""+i).disabled="disabled";
      }
    }
    else{
      for(let i=business+1;i<=total;i++){
        document.getElementById(""+i).disabled="disabled";
      }
    }
    for(const seat of seatarray){
      if(seat.state){
        document.getElementById(""+j).disabled="disabled";
      }
      j++;
    }
  });
  flag=true;
}
const Submit=(e)=>{
  e.preventDefault();
  let c = 0;
  let reserved=[];
  for(let j=1;j<=business+economy;j++){
    const checkbox = document.getElementById(j+"");
    if(checkbox.checked){
      c++;
    }
  }
  console.log(c);
  if(c!=limit){
    window.confirm('Please Select '+limit+' Seats');
  }
  else{
    for(let j=1;j<=business+economy;j++){
      const checkbox = document.getElementById(j+"");
      if(checkbox.checked){
        reserved.push(j+"");
      }
    }
    const sent={_id:id,seats:reserved};
    reservation = {...reservation,seatDeparture:reserved};
    const x = axios.patch('http://localhost:5000/flights/reserveseats/',sent);
    history.push({
      pathname: '/returnSeats',
      state:depFlight,retFlight,reservation
    }); 
    window.location.reload();
    
  

  }



}


   
    
  return(
    <div>
      <u><h1>Please Select Departure Flight Seats</h1></u>
      {final}
      <button onClick={Submit}>Confirm Departure Flight Seats</button>
    </div>
  )

  
}  
export default Seat;