// import axios from 'axios';
// import {react,useEffect} from 'react';
// import {useState} from 'react';
// import {TextField,Button,Paper,Typography} from '@material-ui/core';
// import {useParams} from 'react-router-dom';
// import { Link,useHistory,useLocation,
// } from 'react-router-dom';
// import './seats.scss';
             
// let final=[];
// // let flag=false;
// let row=1;
// const depSeats=[1,2];
// const userName = 'Disha';
// let dakhal = false;
// let set = false;
// let flag2 = true;
// let done = false;
// const flightNo = "dishaest";
// let firstrender = true;
// const cabin = 'Business';
// const resid = '61e1e064ccb475d2882b9667';

// const getPost = async (flightNo) => {
//     const res = await axios.post('http://localhost:5000/flights/searchflights',{flightNo: flightNo});
//     const flight = res.data;
//     return flight;
// }

// const Seat =  () => {
//   const history = useHistory();
//   const [display,setDisplay]=useState();
//   const[flag,setflag]=useState(false);
//   const[depFlight,setFlight]=useState({});
//   const[refresh,refreshf]=useState(false);

//   if(!done){
//     console.log('0');  
//     const flightd = async ()=>{const promise = await getPost(flightNo); return promise;  }
//     const flightdetails = flightd();
//     flightdetails.then(function(result){
//     const flightdata = result;
//     setFlight(flightdata[0]);
//     console.log(depFlight);
//     });
//     done = true;
//     }   


//  // let {reservation} = location.state;  
//   let economy = 0;
//   let business = 0;
//   let id='';
//   let limit = 2;
//   let seatarray=[];
//   let total;

//   useEffect(()=>{
//     console.log('1');
//   economy = depFlight.economySeats;
//   console.log(depFlight.economySeats);
//   business = depFlight.businessSeats;
//   total = economy + business;
//   seatarray=depFlight.seats;
//   id=depFlight._id;
//   //limit = reservation.passengers;
//   if(!firstrender){
//   if(!flag){
//   for(let i=1;i<=economy+business;i++){
//     if(i<=business && business-i+1>=6){
//         console.log('3');
//       if(i==1)final.push(<u><h2>Business Class</h2></u>);
//       final.push(<div class="seat-row">
//       <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//       <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//       <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//       <div class="aisle"><span class="aisle-number">{row}</span></div>
//       <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//       <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//       <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//     </div>)
//     }
//     else if(i<=business && business-i+1<6){
//       let seatsleft = business-i+1;
//       switch(seatsleft){
//         case 1 :final.push(<div class="seat-row">
//                   <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//                   <div class="aisle"><span class="aisle-number">{row}</span></div>
//         </div>);break;
//         case 2: final.push(<div class="seat-row">
//                 <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//                 <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//                 <div class="aisle"><span class="aisle-number">{row}</span></div>
//         </div>);break;
//         case 3: final.push(<div class="seat-row">
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="aisle"><span class="aisle-number">{row}</span></div>        
//         </div>);break;
//         case 4: final.push(<div class="seat-row">
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="aisle"><span class="aisle-number">{row}</span></div>
//         <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         </div>);break;
//         case 5: final.push(<div class="seat-row">
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="aisle"><span class="aisle-number">{row}</span></div>
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         </div>);break;



//       }
//     }
//     if(i>business && total-i+1>=6){
//       if(i==business+1)final.push(<u><h2>Economy Class</h2></u>)
//       final.push(<div class="seat-row">
//       <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//       <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//       <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//       <div class="aisle"><span class="aisle-number">{row}</span></div>
//       <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//       <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//       <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//     </div>)
//     }
//     else if(i>business && total-i+1<6){
//       let seatsleft = total-i+1;
//       switch(seatsleft){
//         case 1 :final.push(<div class="seat-row">
//                   <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//                   <div class="aisle"><span class="aisle-number">{row}</span></div>
//         </div>);break;
//         case 2: final.push(<div class="seat-row">
//                 <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//                 <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//                 <div class="aisle"><span class="aisle-number">{row}</span></div>
//         </div>);break;
//         case 3: final.push(<div class="seat-row">
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="aisle"><span class="aisle-number">{row}</span></div>        
//         </div>);break;
//         case 4: final.push(<div class="seat-row">
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="aisle"><span class="aisle-number">{row}</span></div>
//         <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         </div>);break;
//         case 5: final.push(<div class="seat-row">
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="aisle"><span class="aisle-number">{row}</span></div>
//         <div class="seat one"><label class="label" for={i}><input id={i++} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         <div class="seat one"><label class="label" for={i}><input id={i} type="checkbox" class="seat-check visuallyhidden" name="seat-kssignment" value="" data-seat="K1"  /><span class="seat-label">One</span></label></div>
//         </div>);break;
//       }
//     }
//     row++;
//   }
//   console.log('here1' + set);

//     console.log(final);
//     setDisplay(final);
  
//   console.log('here' + set);
//   setflag(true);

// }

    
// }
//     firstrender=false;
    
//   },[depFlight]);



// useEffect(()=>{
//   function setflag2func(){
//     console.log('herenow');  
//     let j=1;
//     dakhal = true;
//     if(cabin=='Economy'){ //replace cabin with : reservation.cabinDeparture
//       console.log('hi1');
//       for(let i=1;i<=business;i++){
//         document.getElementById(""+i).disabled="disabled";
//       }
//     }
//     else{
//       for(let i=business+1;i<=total;i++){
//         document.getElementById(""+i).disabled="disabled";
//       }
//     }
//     for(const seat of seatarray){
//       if(seat.state){
//         document.getElementById(""+j).disabled="disabled";
//       }
//       j++;
//     }

// }
// if(flag){
//     console.log('herenow1');
//     setflag2func();
// }
  
// },[flag]);
// const back=(e)=>{
//   history.go(-1);
// }
// const Submit=(e)=>{
//   e.preventDefault();
//   let c = 0;
//   let reserved=[];
//   for(let j=1;j<=business+economy;j++){
//     const checkbox = document.getElementById(j+"");
//     if(checkbox.checked){
//       c++;
//     }
//   }
//   console.log(c);
//   if(c!=limit){
//     window.confirm('Please Select '+limit+' Seat(s)');
//   }
//   else{
//     for(let j=1;j<=business+economy;j++){
//       const checkbox = document.getElementById(j+"");
//       if(checkbox.checked){
//         reserved.push(j+"");
//       }
//     }
//     const sent={_id:id,seats:reserved};
//   //  reservation = {...reservation,seatDeparture:reserved};
//     const x = axios.patch('http://localhost:5000/flights/reserveseats/',sent);
//     const z = axios.patch('http://localhost:5000/flights/emptyseats/',{_id:"61bf39afb234bd9e865af8fa", seats:['1','2','3','4','5']})
 //   const y = axios.patch('http://localhost:5000/flights/updateSeat',{_id:resid ,res:reservation});
    // history.push({
    //   pathname: '/returnSeats',
    //   state:{depFlight,retFlight,reservation}
   // }); 
   // window.location.reload();
    
    
  

//   }
// }




   
    
//   return(
//     <div>
//       <button onClick={back}>Back</button>
//       <u><h1>Please Select New Departure Flight Seats</h1></u>
//       {display}
//       <button onClick={Submit}>Confirm Departure Flight Seats</button>
//     </div>
//   )

// }  

// export default Seat;




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
  const{flight}=location.state;
  const{type}=location.state;
  let{edited}=location.state;
  let {reservation} = location.state;  
  let economy = 0;
  let business = 0;
  let id='';
  let limit = 0;
  let seatarray=[];
  let total;
  useEffect(()=>{
   
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
  const oldseats=[];
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
    if(type=='dep'){
        oldseats=reservation.seatDeparture;
        reservation = {...reservation,seatDeparture:reserved};
    }
    else{
        oldseats= reservation.seatReturn;
        reservation = {...reservation,seatReturn:reserved};
    }
    const z = axios.patch('http://localhost:5000/flights/emptyseats/',{_id:reservation._id,seats:oldseats});
    const x = axios.patch('http://localhost:5000/flights/reserveseats/',sent);
    edited = true;
    history.push({
      pathname: '/returnSeats',
      state:{flight,reservation,type,edited}
    }); 
    window.location.reload();
    
  }
}




   
    
  return(
    <div>
      <button onClick={back}>Back</button>
      <u><h1>Please Select Departure Flight Seats</h1></u>
      {display}
      <button onClick={Submit}>Confirm Departure Flight Seats</button>
    </div>
  )

}  

export default Seat;