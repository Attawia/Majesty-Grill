import nodemailer from 'nodemailer';
import { cancelReservation } from './users.js';

// create reusable transporter object using the default SMTP transport
  export const  sendCancelEmail = (req, res)=>
  {
    const bookingNumber = req.body.bookingNumber;
    const userEmail = req.body.userEmail;
    const totalPrice = req.body.totalPrice;
    console.log("el email fel server: " + userEmail)
    
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zaki17281@gmail.com',
      pass: 'dplqaeevhboazqnx'
    }
  });
  
  var mailOptions = {
    from: 'zaki17281@gmail.com',
    to: 'zakimohamed380@yahoo.com',
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
  