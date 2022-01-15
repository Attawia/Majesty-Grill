import { useEffect, useState } from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import '../ReservationSummary/style.css'
import axios from "axios";

let pathBeebo="";


const SelectedFlight = () =>{

const [flight, setFlight] = useState(null);

const location = useLocation();
const history = useHistory();

const {type,reservation, flightNumber, from , to, time, price, cabin, seats, edited, criteria} = location.state;


const x = (edited)? "Edited" : "Selected";  

const getTheFlight = async() => {
    const res = await axios.post('http://localhost:5000/flights/searchFlights', criteria);
    return res.data;
}

useEffect(()=>{
getTheFlight()
 .then((result)=>{
     setFlight(result);
 })

},[])

//depends on the type el path hhy5tlef
if(type == "Departure" ) {
    // setPath("/");
    // setFlag(true);
    pathBeebo = "/";
 
}
else {
 pathBeebo = "/";} 

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
                             <td>{flightNumber}</td>
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
                             <td>{time}</td>
                         </tr>

                         <tr>
                             <th>Price</th>
                             <td>{price}</td>
                         </tr>

                         <tr>
                            <th>Cabin</th>
                             <td>{cabin}</td>
                         </tr>

                         <tr>
                         <th>Seat</th>
                        <td> {seats}</td>
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