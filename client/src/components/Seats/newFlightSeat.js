import axios from 'axios';
import {react,useEffect} from 'react';
import {useState} from 'react';
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import { Link,useHistory,useLocation,
} from 'react-router-dom';
import './seats.scss';
             
let final=[];
let row=1;
let dakhal = false;

const Seat =  () => {
  const history = useHistory();
  const location = useLocation();
  const [display,setDisplay]=useState();
  const[flag,setflag]=useState(false);
  let{flight}=location.state;
  const{type}=location.state;
  let {reservation} = location.state; 
  // let type = 'Departure';
  // let flight = { _id: "61e40e1c8be642cdd39525c6",
  // flightNo: 'DISHA2',
  // departureTime: '2022-01-02T12:22:00.000Z',
  // arrivalTime: '2022-01-02T13:23:00.000Z',
  // economySeats: 18,
  // businessSeats: 18,
  // firstSeats: 1,
  // depAirport: 'CAIRO',
  // arrAirport: 'BERLIN',
  // priceEconomy: 1000,
  // priceBusiness: 3000,
  // tripDuration: '1.0166666666666666',
  // freeEconomySeats: 17,
  // freeBusinessSeats: 18,
  // baggageAllowance: 2,
  // seats: [
  //   { seatName: 1, state: false },
  //   { seatName: 2, state: false },
  //   { seatName: 3, state: false },
  //   { seatName: 4, state: false },
  //   { seatName: 5, state: false },
  //   { seatName: 6, state: false },
  //   { seatName: 7, state: false },
  //   { seatName: 8, state: false },
  //   { seatName: 9, state: false },
  //   { seatName: 10, state: false },
  //   { seatName: 11, state: false },
  //   { seatName: 12, state: false },
  //   { seatName: 13, state: false },
  //   { seatName: 14, state: false },
  //   { seatName: 15, state: false },
  //   { seatName: 16, state: false },
  //   { seatName: 17, state: false },
  //   { seatName: 18, state: false },
  //   { seatName: 19, state: false },
  //   { seatName: 20, state: false },
  //   { seatName: 21, state: false },
  //   { seatName: 22, state: false },
  //   { seatName: 23, state: false },
  //   { seatName: 24, state: false },
  //   { seatName: 25, state: false },
  //   { seatName: 26, state: false },
  //   { seatName: 27, state: false },
  //   { seatName: 28, state: false },
  //   { seatName: 29, state: false },
  //   { seatName: 30, state: false },
  //   { seatName: 31, state: false },
  //   { seatName: 32, state: false },
  //   { seatName: 33, state: false },
  //   { seatName: 34, state: false },
  //   { seatName: 35, state: false },
  //   { seatName: 36, state: false }],}

  //     let reservation ={_id:'61e4104e8be642cdd39525f1',
  //       userName: 'Disha',
  //       timeDeparture: '2022-01-02T12:22:00.000+00:00',
  //       priceDeparture: 1000,
  //       cabinDeparture: 'Economy',
  //       seatDeparture:['19'],
  //       flightDeparture:'DISHA2',
  //       timeReturn:'2022-01-06T12:23:00.000+00:00',
  //       priceReturn: 1000,
  //       cabinReturn:'Economy',
  //       seatReturn:['22'],
  //       flightReturn:'DISHA4',
  //       totalPrice:2000,
  //       bookingNumber:'267178',
  //       passengers:1,
  //       from:'CAIRO',
  //       to:'BERLIN',}
  let economy = 0;
  let business = 0;
  let id='';
  let limit = 0;
  let seatarray=[];
  let total;
  useEffect(()=>{
    id=flight._id;
    economy = flight.economySeats;
    business = flight.businessSeats;
    total = economy + business;
    seatarray=flight.seats;
    limit = reservation.passengers;

  
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
    setDisplay(final);
  setflag(true);
}


  },[flight,reservation,type,display]);

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
        reservation = {...reservation,seatDeparture:reserved};
    }
    else{
        reservation = {...reservation,seatReturn:reserved};
    }
    const x = axios.patch('http://localhost:5000/flights/reserveseats/',sent);
    // history.push({
    //   pathname: '/returnSeats',
    //   state:{flight,reservation,type,edited}
    // }); 
    // history.push('/');
    // window.location.reload();
    
  }
}




   
    
  return(
    <div>
      <button onClick={back}>Back</button>
      <u><h1>Please Select New {type} Flight Seats</h1></u>
      {display}
      <button onClick={Submit}>Confirm New {type} Flight Seats</button>
    </div>
  )

}  

export default Seat;