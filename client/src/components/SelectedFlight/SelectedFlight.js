import { useEffect, useState } from "react";
import {Link, useHistory, useLocation} from "react-router-dom";

import './style.css'

import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


const SelectedFlight = () =>{

const [flight, setFlight] = useState(null);
const [loggedIN, setLogged] = useState(false);
const [flag, setFlag] = useState(true);
const location = useLocation();
const history = useHistory();

//Momken yego ya ema mn allreservationDest
//ya ema mn Disha
let typeDest = "";
let reservationDest={seats:[1]};
let editedDest = "";

try{
    console.log("gowa el try");

    const {type, reservation, edited} = location.state;
    typeDest=type;
    reservationDest=reservation;
    editedDest=edited;
    if(!loggedIN)
    setLogged(true);
}catch(error){
 console.log(error);
}


const x = (editedDest)? "editedDest" : "Selected";  
const from = (typeDest == "Departure")?reservationDest.from : reservationDest.to;
let pathBeebo = '/editreservation' ;

const to = (typeDest == "Return")?reservationDest.from : reservationDest.to;
const criteria = {flightNo : reservationDest["flight"+typeDest]};
//depends on the typeDest el path hhy5tlef bel nesba le beebo

const getTheFlight = async() => {
    const res = await axios.post('http://localhost:5000/flights/searchFlights', criteria);
    return res.data;
}


useEffect(()=>{
//lw editedDest khlas msh m7tag arooh ageeb el flight l2en da m3nah eny gy mn 3nd disha

getTheFlight()
 .then((result)=>{
     console.log(result);
     setFlight(result);
     
 })
 //bs m7tag a3mel save lel reservationDest el gdeeda fel database msh hyhsal gher lw editedDest b true
 if(editedDest){
    const updated = {_id : reservationDest._id, reservationDest : reservationDest};
    axios.patch('http://localhost:5000/reservationDests/updatereservationDest', updated);
 }

},[])



 function toDisha(){
     const type = typeDest;
     const edited = editedDest;
     const reservation = reservationDest;
    history.push({
        pathname: "/changeseat",
        state:{type, edited, reservation, flight}
      }); 
      window.location.reload();
      
 }
 
    return(
        
             <div> 
                  {!loggedIN && <Link to={'/'}> Log in please!</Link> }

                  {  loggedIN &&  <div> 
                 <Navbar/>
                 { <Link to={`/allreservationDests/`}>
                   <button>Back</button>
                    </Link>
                }
    
                    <h1 class = "centerElement burgandy" >
                    Itinerary Of {x} Flight </h1>   
                 <div class = "row">
                    <div class = "column">
                     <table border = '1'>
                         <caption>{typeDest} Flight Details</caption>
                         <tr>
                             <th>Flight Number</th>
                             <td>{reservationDest["flight" + typeDest]}</td>
                         </tr>
                         
                         <tr>
                             <th>From</th>
                             <td>{from}</td>
                         </tr>
                          
                         <tr>
                             <th>To</th>
                             <td>{to}</td>
                         </tr>
                         
                         <tr>
                             <th>Date</th>
                             <td>{reservationDest["time"+typeDest].substring(0, 10)}</td>
                         </tr>

                        <tr>
                             <th>Time</th>
                             <td>{reservationDest["time"+typeDest].substring(11, 16)}</td>
                         </tr>
                         
                         <tr>
                             <th>Price</th>
                             <td>{reservationDest["price"+typeDest]}</td>
                         </tr>

                         <tr>
                            <th>Cabin</th>
                             <td>{reservationDest["cabin"+typeDest]}</td>
                         </tr>

                         <tr>
                         <th>Seat</th>
                        <td> {reservationDest["seat"+typeDest].toString()}</td>
                         </tr>
                    </table>
                    </div>
                    
                  
               
               
               </div>
               <br />
               <hr />

            <div>
               <ul>
               <Link to={
                   //mstny path mn beebo
                   {
                   pathname: '/editreservationDest',
                   state: {reservationDest, typeDest}
                   }

               }>
               <li> <button>Edit</button></li>
               </Link>

               
               
                     <li>
                   <button onClick={toDisha}>Change Seats</button></li>
                  
               </ul>
               </div>
               <br />
               <br />
               <br />
               <br />
               <br />
               <br />
               <br />
               <br />
               <br />
               <br />
               
               <Footer/>
               </div>}
        </div>
        
    )
}

export default SelectedFlight;