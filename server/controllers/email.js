import nodemailer from 'nodemailer';

import { cancelReservation } from './users.js';


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zaki17281@gmail.com',
    pass: 'dplqaeevhboazqnx'
  }
});

// create reusable transporter object using the default SMTP transport
  export const  sendCancelEmail = (req, res)=>
  {
    const bookingNumber = req.body.bookingNumber;
    const userEmail = req.body.userEmail;
    const totalPrice = req.body.totalPrice;
    console.log("el email fel server: " + userEmail)

    
  
  var mailOptions = {
    from: 'zaki17281@gmail.com',
    to: userEmail,
    subject: 'Sending Email using Node.js',

    text: `Unfortunately your booking number : ${bookingNumber} has been cancelled and the amount: ${totalPrice} is refunded.`

  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  }

  export const  sendItineraryEmail = (req, res)=>
  {
    
     const userEmail = req.body.userEmail;
    const {flightReturn, flightDeparture, from, to, timeReturn, timeDeparture, cabinReturn, cabinDeparture, seatReturn, seatDeparture} = req.body.reservation;
     console.log("el email el gdeed fel server: " + flightReturn)

  var mailOptions = {
    from: 'zaki17281@gmail.com',
    to: userEmail,
    subject: 'Sending Email using Node.js',

    text: `Your Itinerary ==> 
    Departure Flight : ${flightDeparture} 
    From : ${from}
    To : ${to} 
    Time : ${timeDeparture}
    Cabin : ${cabinDeparture}
    Seats : ${seatDeparture}
    ----------------------------------
    ----------------------------------
    Return Flight : ${flightReturn}
    From : ${to}
    To : ${from} 
    Time : ${timeReturn}
    Cabin : ${cabinReturn}
    Seats : ${seatReturn}
    `

  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  }
  