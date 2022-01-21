import axios from 'axios';
import react from 'react';
import {useState,useEffect} from 'react';
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import { Link,useHistory,useLocation} from 'react-router-dom';
import { getUsername } from '../../api/auth';
import { getEmailCaller } from '../../actions/ShowAllRes';
import './seats.scss';
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Footer/Footer.js';


// let seatarray=[{seatName: "1",state:true},
//               {seatName: "2",state:true},
//               {seatName: "3",state:true},
//               {seatName: "4",state:true},
//               {seatName: "5",state:true},
//               {seatName: "6",state:true},
//               {seatName: "7",state:false},
//               {seatName: "8",state:false},
//               {seatName: "9",state:false},
//               {seatName: "10",state:true},
//               {seatName: "11",state:false},
//               {seatName: "12",state:false},
//               {seatName: "13",state:true},
//               {seatName: "14",state:true},
//               {seatName: "15",state:true},
//               {seatName: "16",state:true},
//               {seatName: "17",state:true},
//               {seatName: "18",state:true},
//               {seatName: "19",state:true},
//               {seatName: "20",state:false},];                    
let final=[];
let row=1;
let set = false;
const Seat =  () => {
  const history = useHistory();
  const location = useLocation();

  const [flag,setflag]=useState(false);
  const [display,setDisplay]=useState();
  const [currUser,setCurrUser] = useState(null);
  const [flag2, setFlag2] = useState(false);

  const {depFlight} = location.state;
  const {retFlight} = location.state;
  let {reservation} = location.state;

  let email;

  let economy = 0;
  let business = 0;
  let total = business + economy;
  let id='';
  let limit = 0;
  let seatarray=[];

  const getTheUser = async () =>
  {
      const theUser = await getUsername(); 
       setCurrUser(theUser);
       
  }
  

  if(!flag2){
    getTheUser();
    setFlag2(true);
 }


  useEffect(()=>{

    
    if(currUser){
      getEmailCaller(currUser)
         .then((result)=>{
         email = result;
 })
 
}


    console.log(reservation);
    console.log(retFlight);
    economy = retFlight.economySeats;
    console.log(reservation);
    business = retFlight.businessSeats;
    let total = business + economy;
    seatarray=retFlight.seats;
    id=retFlight._id;
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


  // document.addEventListener("DOMContentLoaded", function(event) {
  //   let j=1;
  //   if(reservation.cabinReturn=='Economy'){
  //     for(let i=1;i<=business;i++){
  //       document.getElementById(""+i).disabled="disabled";
  //     }
  //   }
  //   else{
  //     for(let i=business+1;i<=total;i++){
  //       document.getElementById(""+i).disabled="disabled";
  //     }
  //   }
  // });
  setflag(true);
}
  },[retFlight,reservation,display, currUser]);


  useEffect(()=>{
    
    function setflag2func(){
      console.log(reservation.cabinReturn);
      let j=1;
      if(reservation.cabinReturn=='Economy'){
        for(let i=1;i<=business;i++){
          document.getElementById(""+i).disabled="disabled";
        }
      }
      else{
        console.log(business);
        console.log(total);
        for(let i=business+1;i<=total;i++){
          document.getElementById(""+i).disabled="disabled";
          console.log(document.getElementById(""+i))
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
    reservation = {...reservation,seatReturn:reserved,userName:currUser};
    console.log(reservation);
    axios.all([
    axios.post('http://localhost:5000/sendemail/itineraryemail',{userEmail:email, reservation}),
    axios.patch('http://localhost:5000/flights/reserveseats/',sent),
    axios.post('http://localhost:5000/flights/addreservation/',reservation)]);
    history.push('/summaryreservation/');
  }



}


   
    
  return(
    <div>
      <Navbar/>
      <button onClick={back}>Back</button>
      <u><h1>Please Select Return Flight Seats</h1></u>
      {display}
      <button onClick={Submit}>Confirm and Proceed to Payment</button>
    </div>
  )

  
}  
export default Seat;