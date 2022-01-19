import {  useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import './style.css';
import { getUsername, isGuest } from "../../api/auth";



const ReservationSumm = () =>
{
    //btgeeb el id el fel url
    const [currUser,setCurrUser] = useState(null);
    const [summary, setSummary] = useState(null);
    const [loggedIN, setLogged] = useState(true);
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

    //btgeeb mn el server
    const getTheSummary = async() =>
    {
        //http://localhost:5000/users/SummaryReservation/
     const resp =  await axios.get('http://localhost:5000/users/SummaryReservation/' + currUser);
     console.log("the returned data from the server: " + resp.data)
        return resp.data;
    }

    useEffect(()=>
    {
    if(loggedIN && flagAllowed)
    {
        const getSummary = async () =>
     {
        const theSummary = await getTheSummary(); 
        console.log("the summary in useEffect: " + theSummary);

    return theSummary;

     }
  getSummary()
      .then((result)=>
      { 

          if(!flagSummary){
              setSummary(result);
              setFlagSummary(true);
        }
          console.log("the summary in the second method: " + JSON.stringify(result));
        
      })
     

     
    }
    

    

    },[flagAllowed,loggedIN,currUser])


    return(
        
        <div>
                {!loggedIN && <Link to={'/'}> Log in please!</Link> }
        
                { !summary && loggedIN && <div> could not fetch the data for that resource </div>}
        

                 { summary && 
            <div> 
                    <h1 class = "centerElement burgandy" >Your Ticket Itinerary </h1>   
                 <div class = "row">
                    <div class = "column">
                     <table border = '1'>
                         <caption>Departure Flight Details</caption>
                         <tr>
                             <th>Flight Number</th>
                             <td>{summary.flightDeparture}</td>
                         </tr>
                         
                         <tr>
                             <th>From</th>
                             <td>{summary.from}</td>
                         </tr>
                          
                         <tr>
                             <th>To</th>
                             <td>{summary.to}</td>
                         </tr>
                         
                         <tr>
                             <th>Time</th>
                             <td>{summary.timeDeparture}</td>
                         </tr>

                         <tr>
                             <th>Price</th>
                             <td>{summary.priceDeparture}</td>
                         </tr>

                         <tr>
                            <th>Cabin</th>
                             <td>{summary.cabinDeparture}</td>
                         </tr>

                         <tr>
                         <th>Seat</th>
                        <td> {summary.seatDeparture.toString()}</td>
                         </tr>
                    </table>
                    </div>
                    
                  
                    <div className="column">
                    <table border = '1'>
                        <caption>Return Flight Details</caption>
                        <tr>
                             <th>Flight Number</th>
                             <td>{summary.flightReturn}</td>
                         </tr>
                         
                        <tr>
                             <th>From</th>
                             <td>{summary.to}</td>
                         </tr>
                          
                         <tr>
                             <th>To</th>
                             <td>{summary.from}</td>
                         </tr>
                         
                    <tr>
                        <th>Time</th>
                        <td>{summary.timeReturn}</td>
                    </tr>

                    <tr>
                        <th>Price</th>
                        <td>{summary.priceReturn}</td>
                    </tr>

                    <tr>
                       <th>Cabin</th>
                        <td>{summary.cabinReturn}</td>
                    </tr>

                    <tr>
                    <th>Seat</th>
                   <td> {summary.seatReturn}</td>
                    </tr>
               </table>
               

               {/* for the table
                */}
               </div> 
               {/* for the table
                */}
               </div>
                <br />
                <hr />

                <div class = "last">
                <p >Booking Number: {summary.bookingNumber}</p>
                <p >Total Price: {summary.totalPrice}</p>
                <p >Number Of Passengers: {summary.passengers}</p>
                </div>
                
                <Link to={'/usersearch'}>
                <button>Back</button>
                </Link>
               </div> 
                
                }
        </div>
    );
}
export default ReservationSumm;