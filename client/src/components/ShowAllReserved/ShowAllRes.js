import {  Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { changePassword, getUsername, isGuest } from "../../api/auth";
import SelectedFlight from "../SelectedFlight/SelectedFlight";

import './style.css';
import {getEmailCaller, cancelReservation, getAllCaller, getAll, sendItinerary} from '../../actions/ShowAllRes'
let seats = "";
let count = 1;

const ShowAllReserved = () => {



// const [empty, setEmpty] = useState(false);
//const [cancel, setCancel] = useState(false);

// const [flagSummary,setFlagSummary] = useState(false);
// const [reservations, setReservations] = useState(null);
// const [userEmail, setUserEmail] = useState(null);



const [data, setData] = useState({
    empty : false,
    cancel: false,
    userEmail : null
});

const [resAndF, setRestAndF] = useState({
    reservations : null,
    flagSummary : false  
})

const [currUser,setCurrUser] = useState(null);
const [loggedIN, setLogged] = useState(true);
const [selected, setSelected] = useState(false);
const [isPending, setIsPending] = useState(true);
const [flagAllowed, setAllowed] = useState(true);

const [flag, setFlag] = useState(false);



const getTheUser = async () =>
    {
        const theUser = await getUsername(); 
         setCurrUser(theUser);
         console.log("after setCurrUser: " + count);
    }
    
    const guestUserCheck = async () => {

    const guestUser = await isGuest();

    if(guestUser){setLogged(false)};
    console.log("after setLogged: " + count);
     }

     if(!flag){
        getTheUser();
        guestUserCheck();
        setFlag(true);
     }



useEffect(()=>
{
    let email;
    
    if(currUser){
        getEmailCaller(currUser)
           .then((result)=>{
        //    setUserEmail(result);
             email = result;
   })
   
}

if(loggedIN && flagAllowed && currUser)
{
setAllowed(false);
console.log("after setAllowed: " + count);

  getAllCaller(currUser).
  then((result)=>{

  
  console.log(result);
 
          //btkhosh el etnen dy fe render w dy fel ba3dha!!
      if( result.length == 0) {
        //   setEmpty(true);setIsPending(true);

        console.log("if then: "+ count);
        
        setIsPending(false);
        console.log("after setIsPending: " + count);
        setData({empty : true});
        console.log("after setData: " + count);
    }
      else if(!resAndF.flagSummary){ 
        console.log("if else: " + count);
        
          //setIsPending(false);setEmpty(false);
          //setReservations(result);setFlagSummary(true);
          setIsPending(false);
          console.log("after setIsPending: " + count);
          setData({empty : false, 
            
            userEmail : email
        });
        console.log("after setCurrUser: " + count);

          setRestAndF({reservations : result, flagSummary : true});
        };
        console.log("after setRest: " + count);
          
        
    })
    
 
}

//----------------------

},[flagAllowed,loggedIN,currUser])



console.log('here: ' + count++);

    return ( 
    <div>
        

        <Link to={`/UserSearch`}>
             <button>Back</button>
        </Link>
        
         {!loggedIN && <Link to={'/'}> Log in please!</Link> }
        
        
          { isPending && <div>Loading...</div> }
          
        { !isPending && data.empty && !data.cancel &&
        <div class = "Msg-Error">
            <div class="alert error">
                <strong>!!</strong> No Current Reservations
            </div>
        </div>
         }

        { data.cancel && 
            <div class = "Msg-Info">
     



     <div class="alert info">
       <strong>Info!</strong> This flight has been cancelled and we have sent you an email with all the details
     </div>
     
     
     
      </div>
      }


        
        {resAndF.reservations&& 
            <div>




                <h1 class = "centerElement">All Reservations </h1>  
                        
                {resAndF.reservations.map(reservation=>
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
                                 <td>{reservation.to}</td>
                             </tr>

                             <tr>
                                 <th>To</th>
                                 <td>{reservation.from}</td>
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
                                }, data.userEmail
                                );

                                 setIsPending(false);
                                setData({
                                cancel: true});
                                // setCancel(true);

                             
                          
                        }
                        }}>Cancel Reservation</button>

                        <button onClick={()=>{
                            sendItinerary(data.userEmail, reservation)
                        }}>Send My Itinerary</button>

<Link to={{
    pathname: "/allReservations/selectedFlight",
    state: {
            type : "Departure",
            reservation,
            edited : false
            }
        }}>
        <button >Select Departure Flight </button>
        
</Link>

<Link to={{
    pathname: "/allReservations/selectedFlight",
    state: {
            type : "Return",
            reservation,
            edited : false,
             }
        }}>
        <button >Select Return Flight </button>
</Link>

                     
                        
                        

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