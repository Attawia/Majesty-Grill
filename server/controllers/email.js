import nodemailer from 'nodemailer';

// create reusable transporter object using the default SMTP transport
  export const  sendCancelEmail = ()=>
  {
    
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
    text: 'Your Reservation has been Cancelled!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  }
  