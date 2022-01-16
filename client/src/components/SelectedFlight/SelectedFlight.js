import { useEffect, useState } from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import '../ReservationSummary/style.css'
import axios from "axios";



const SelectedFlight = () =>{

const [flight, setFlight] = useState(null);

const location = useLocation();
const history = useHistory();

//Momken yego ya ema mn allReservation
//ya ema mn Disha
const {type, reservation, edited} = location.state;


const x = (edited)? "Edited" : "Selected";  
const from = (type == "Departure")?reservation.from : reservation.to;
const pathBeebo = (type == "Departure")? "/" : "/" ;

const to = (type == "Return")?reservation.from : reservation.to;
const criteria = {flightNo : reservation["flight"+type]};
//depends on the type el path hhy5tlef bel nesba le beebo

const getTheFlight = async() => {
    const res = await axios.post('http://localhost:5000/flights/searchFlights', criteria);
    return res.data;
}


useEffect(()=>{
//lw edited khlas msh m7tag arooh ageeb el flight l2en da m3nah eny gy mn 3nd disha
if(!edited){
getTheFlight()
 .then((result)=>{
     setFlight(result);
     
 })}
 //bs m7tag a3mel save lel reservation el gdeeda fel database msh hyhsal gher lw edited b true
 else{
    const updated = {_id : reservation._id, reservation : reservation};
    axios.patch('http://localhost:5000/reservations/updateReservation', updated);
 }

},[])



 function toDisha(){
    history.push({
        pathname: "/changeseat",
        state:{type, edited, reservation, flight}
      }); 
      window.location.reload();
      
 }
 
    return(
        
             <div> 
                    <h1 class = "centerElement burgandy" >
                    Itinerary Of {x} Flight </h1>   
                 <div class = "row">
                    <div class = "column">
                     <table border = '1'>
                         <caption>{type} Flight Details</caption>
                         <tr>
                             <th>Flight Number</th>
                             <td>{reservation["flight" + type]}</td>
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
                             <th>Time</th>
                             <td>{reservation["time"+type]}</td>
                         </tr>

                         <tr>
                             <th>Price</th>
                             <td>{reservation["price"+type]}</td>
                         </tr>

                         <tr>
                            <th>Cabin</th>
                             <td>{reservation["cabin"+type]}</td>
                         </tr>

                         <tr>
                         <th>Seat</th>
                        <td> {reservation["seat"+type]}</td>
                         </tr>
                    </table>
                    </div>
                    
                  
               
               
               </div>
               <br />
               <hr />

               <ul>
               <Link to={
                   //mstny path mn beebo
                   {
                   pathname: pathBeebo,
                   state: {reservation, edited}
                   }

               }>
               <li> <button>Edit</button></li>
               </Link>

               <br />
               
               
                     <li>
                   <button onClick={toDisha}>Change Seats</button></li>
                  
               </ul>
               
        </div>
    )
}

export default SelectedFlight;