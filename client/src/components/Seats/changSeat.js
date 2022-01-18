import axios from 'axios';
import {react,useEffect} from 'react';
import {useState} from 'react';
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import { Link,useHistory,useLocation,
} from 'react-router-dom';
import './seats.scss';
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Footer/Footer.js';
             
let final=[];
let row=1;
let dakhal = false;



const Seat =  () => {
  const history = useHistory();
  const location = useLocation();
  const [display,setDisplay]=useState();
  const[flag,setflag]=useState(false);
  let{flight}=location.state;
  flight=flight[0];
  const{type}=location.state;
  let{edited}=location.state;
  let {reservation} = location.state;  
  let economy = 0;
  let business = 0;
  let id='';
  let limit = 0;
  let seatarray=[];
  let total;
  let typestr="";
  useEffect(()=>{
    console.log(type);
    id=flight._id;
    console.log(id);
    console.log(flight);
    economy = flight.economySeats;
    console.log(flight.economySeats);
    business = flight.businessSeats;
    total = economy + business;
    seatarray=flight.seats;
    limit = reservation.passengers;

  
  if(!flag){
    console.log(business);
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
    setDisplay(final);
  setflag(true);
}


  },[flight,reservation,type,edited,display]);

useEffect(()=>{

  function setflag2func(){
    let j=1;
    console.log(reservation.cabinDeparture);
    dakhal = true;
    if(reservation.cabinDeparture=='Economy'){
      for(let i=1;i<=business;i++){
        document.getElementById(""+i).disabled="disabled";
      }
    }
    else{
      console.log(business);
      console.log(total);
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
    
  }
  
  if(flag){
    setflag2func();
  }


},[flag]);
const back=(e)=>{
  history.go(-1);
}
const Submit=async(e)=>{  
  e.preventDefault();
  let c = 0;
  let reserved=[];
  let oldseats=[];
  for(let j=1;j<=business+economy;j++){
    const checkbox = document.getElementById(j+"");
    if(checkbox.checked){
      c++;
    }
  }
  console.log(c);
  if(c!=limit){
    window.confirm('Please Select '+limit+' Seat(s)');
  }
  else{
    for(let j=1;j<=business+economy;j++){
      const checkbox = document.getElementById(j+"");
      if(checkbox.checked){
        reserved.push(j+"");
      }
    }
    const sent={_id:id,seats:reserved};
    if(type=='Departure'){
        oldseats=reservation.seatDeparture;
        reservation = {...reservation,seatDeparture:reserved};
    }
    else{
        oldseats= reservation.seatReturn;
        reservation = {...reservation,seatReturn:reserved};
    }
    console.log(oldseats);
    await axios.patch('http://localhost:5000/flights/changeseats',{_id:id,delseats:oldseats,seats:reserved})
    edited = true;
    history.push({
      pathname: '/allReservations/selectedFlight',
      state:{reservation,edited,type}
    }); 
    
  }
}
  
  return(
    <div>
      <Navbar/>
      <button onClick={back}>Back</button>
      <u><h1>Please Select New {type} Flight Seats</h1></u>
      {display}
      <button onClick={Submit}>Update {type} Flight Seats</button>
      <Footer/>
    </div>
  )
}  

export default Seat;