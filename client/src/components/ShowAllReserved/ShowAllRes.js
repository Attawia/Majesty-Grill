import {  Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUsername, isGuest } from "../../api/auth";
import axios from 'axios';
import './style.css';
import {getEmailCaller, cancelReservation, getAllCaller} from '../../actions/ShowAllRes'
let seats = "";


const ShowAllReserved = () => {
    
const [isPending, setIsPending] = useState(true);
const [currUser,setCurrUser] = useState(null);
const [reservations, setReservations] = useState(null);
const [cancel, setCancel] = useState(false);
const [empty, setEmpty] = useState(false);
const [loggedIN, setLogged] = useState(true);
const [userEmail, setUserEmail] = useState(null);
const [flagAllowed, setAllowed] = useState(true);
const [flagSummary,setFlagSummary] = useState(false);


const getTheUser = async () =>
    {
        const theUser = await getUsername(); 
        setCurrUser(theUser);
    }
    
    const guestUserCheck = async () => {

    const guestUser = await isGuest();
    if(guestUser){setLogged(false)};
     }
       getTheUser();
       guestUserCheck();


       useEffect(()=>
       {
         getEmailCaller(currUser)
             .then((result)=>{
                setUserEmail(result);
            })
        },[currUser])

useEffect(()=>
{
    
},[])



useEffect(()=>
{
if(loggedIN && flagAllowed)
{

 getAllCaller(currUser)
  .then((result)=>
  { 
      if(result.length == 0) {setEmpty(true);setIsPending(true);}
      else if(!flagSummary){ setIsPending(false); setReservations(result);setFlagSummary(true);setEmpty(false)};
    
  })

}
console.log('here');
//----------------------

},[flagAllowed,loggedIN,currUser])

console.log("empty: "+empty)

    return ( 
    <div>

        <Link to={`/UserSearch`}>
             <button>Back</button>
        </Link>
        
         {!loggedIN && <Link to={'/'}> Log in please!</Link> }
        
        
         { isPending && <div>Loading...</div> }
        { !isPending && empty && !cancel &&
        <div class = "Msg-Error">
            <div class="alert error">
                <strong>!!</strong> No Current Reservations
            </div>
        </div>
         }

        { cancel && 
            <div class = "Msg-Info">
     



     <div class="alert info">
       <strong>Info!</strong> This flight has been cancelled and we have sent you an email with all the details
     </div>
     
     
     
      </div>
      }

        
        {reservations&& 
            <div>
                <h1 class = "centerElement">All Reservations </h1>  
                        
                {reservations.map(reservation=>
                    (
                        
                        
                        <div> 
                         
                     <div class = "row">
                        <div class = "column">
                         <table border = '1'>
                             <caption>Departure Flight Details</caption>
                             <tr>
                                 <th>Flight Number</th>
                                 <td>{reservation.flightDeparture}</td>
                             </tr>

                             <tr>
                                 <th>From</th>
                                 <td>{reservation.from}</td>
                             </tr>

                             <tr>
                                 <th>To</th>
                                 <td>{reservation.to}</td>
                             </tr>
                             
                             
                             
                             <tr>
                                 <th>Time</th>
                                 <td>{reservation.timeDeparture}</td>
                             </tr>

    
                             <tr>
                                 <th>Price</th>
                                 <td>{reservation.priceDeparture}</td>
                             </tr>
    
                             <tr>
                                <th>Cabin</th>
                                 <td>{reservation.cabinDeparture}</td>
                             </tr>
    
                             <tr>
                             <th>Seats</th>
                            
                            <td>{reservation.seatDeparture}</td>
                    
                             </tr>
                        </table>
                        </div>
                        
                      
                        <div className="column">
                        <table border = '1'>
                            <caption>Return Flight Details</caption>
                            <tr>
                                 <th>Flight Number</th>
                                 <td>{reservation.flightReturn}</td>
                             </tr>

                             <tr>
                                 <th>From</th>
                                 <td>{reservation.from}</td>
                             </tr>

                             <tr>
                                 <th>To</th>
                                 <td>{reservation.to}</td>
                             </tr>
                             
                        <tr>
                            <th>Time</th>
                            <td>{reservation.timeReturn}</td>
                        </tr>
    
                        <tr>
                            <th>Price</th>
                            <td>{reservation.priceReturn}</td>
                        </tr>
    
                        <tr>
                           <th>Cabin</th>
                            <td>{reservation.cabinReturn}</td>
                        </tr>
    
                        <tr>
                        <th>Seat</th>
                       <td> {reservation.seatReturn}</td>
                        </tr>
                   </table>
                   
                   </div> 
                   
                   </div>
                   <br />

                    
                    <button onClick={()=>{
                        if(window.confirm('Are you sure you wish to cancel this reservation?')) 
                        {
                            
                            cancelReservation(reservation._id, {
                                   bookingNumber : reservation.bookingNumber,
                                   totalPrice: reservation.totalPrice
                                }, userEmail
                                );

                                setIsPending(false);
                                setCancel(true);
                             
                          //   console.log(x);
                            //setCancelledReservation(x);
                            
                        }
                        }}>Cancel Reservation</button>
                        
                          
                    <br />
                    <hr />
                    <br />
                    <br />
                    
                   </div> 
                   
                    ))}
            </div>


}

    </div> );
}
 
export default ShowAllReserved;