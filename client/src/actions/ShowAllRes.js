import * as api from '../api';
import axios from 'axios';


//get Email of the user
const getEmail = async(currUser)=>
{
const resp = await axios.get('http://localhost:5000/users/getEmail/' + currUser);
console.log('hee'+currUser);
return resp.data;
};

const getEmailCaller = async(currUser)=>
{
const Email = await getEmail(currUser); 
return Email;
};


//Cancel The reservation
const cancelReservation = async(id, x, userEmail)=>
{
    const {bookingNumber, totalPrice} = x;
    console.log("inside cancelReservation: " + userEmail);    

    axios.all([
        
      axios.post('http://localhost:5000/sendEmail/cancelResEmail', {userEmail, bookingNumber, totalPrice }),
      axios.delete('http://localhost:5000/users/cancelRes/'+id)
        
    ])
    .then(axios.spread((data1, data2)=>
    {
       console.log("data1: " + data1, "data2: " + data2);
    }));

    

    setInterval(() => {
        //setCancel(false);
        window.location.reload();
    }, 3000);

    
}

//Get All Reservation
const getAll = async(currUser) =>
{
        const resp =  await axios.get('http://localhost:5000/users/AllReservations/' + currUser);
        
        return resp.data;
}
const getAllCaller = async (currUser) =>
{
   const Reservations = await getAll(currUser); 
   
return Reservations;

}


export{
    getEmail, getEmailCaller, cancelReservation, getAllCaller, getAll
}