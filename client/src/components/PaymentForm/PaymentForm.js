import react from 'react';
import {TextField, Button, Paper, Typography} from '@material-ui/core';
import useStyles from './styles.js';
import {Link,useHistory,useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import { makePayment } from '../../actions/paymentForm'
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Footer/Footer.js';


const PaymentForm = () => {
    const history = useHistory();
    const location = useLocation();
    let flightDest = "";
    let typeDest = "";
    let reservationDest = "";
    let differenceDest = "";
    let toDest = "";

    let [destFlag,setDestFlag] = react.useState(false);

    try{
        const {flight} = location.state;
        const {type} = location.state;
        const {reservation} = location.state;
        const {difference} = location.state;
        const {to} = location.state;
        flightDest = flight;
        typeDest = type;
        reservationDest = reservation;
        differenceDest = difference;
        toDest = to;
        if(!destFlag)
            setDestFlag(true);
    }catch(error){

    }

    let [amount,setAmount] = react.useState(0);

    useEffect(()=>
    {
        setAmount(differenceDest);
    },[differenceDest]);

    const [paymentInfo,setPaymentInfo] = react.useState({
        cardNo : "",
        custName : "",
        cvv : "",
        expiryMonth : "",
        expiryYear : "",
    });

    let [message,setMessage] = react.useState("");

    const [successFlag,setSuccessFlag] = react.useState(false);

    const classes = useStyles();


    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const Submit = async (e) =>{
        //setMessage("");
        e.preventDefault();
        const namere = /[a-zA-Z]+\s[a-zA-Z]+[\s[a-zA-Z]*/;
        if(paymentInfo.cardNo.length != 16){
            setMessage("Card number invalid");
        }

        else if(!(namere.test(paymentInfo.custName))){
            setMessage("Name invalid");
        }
        else if(paymentInfo.cvv.length != 3){
            setMessage("CVV invalid");
        }
        else if(paymentInfo.expiryMonth < 1 || paymentInfo.expiryMonth >12){
            setMessage("Month should be between 1 and 12");
        }
        else if(paymentInfo.expiryYear < 22){
            setMessage("Expiry Year cannot be in the past");
        }
        else{
        const res = await makePayment({amount: amount*100});
        if(res.status == 200){
            setSuccessFlag(true);
        }
        await timeout(1000);
        const reservation = reservationDest;
        const type = typeDest;
        const flight = flightDest;
        history.push({
            pathname: toDest,
            state:{reservationDest,typeDest,flightDest}
          });
          window.location.reload();
        }
    };

    const onChangeCard = (e) => {
        const re = /^[0-9\b]+$/;
        let tv = e.target.value;
        if (e.target.value === '' || (re.test(e.target.value) && e.target.value.length < 17) ) {
            setPaymentInfo({...paymentInfo, cardNo : e.target.value});
        }
     };
     const onChangeCvv = (e) => {
        const re = /^[0-9\b]+$/;
        let tv = e.target.value;
        if (e.target.value === '' || (re.test(e.target.value) && e.target.value.length < 4) ) {
            setPaymentInfo({...paymentInfo, cvv : e.target.value});
        }
     };
     const onChangeM = (e) => {
        const re = /^[0-9\b]+$/;
        let tv = e.target.value;
        if (e.target.value === '' || (re.test(e.target.value) && e.target.value.length < 3) ) {
            setPaymentInfo({...paymentInfo, expiryMonth : e.target.value});
        }
     };
     const onChangeY = (e) => {
        const re = /^[0-9\b]+$/;
        let tv = e.target.value;
        if (e.target.value === '' || (re.test(e.target.value) && e.target.value.length < 3) ) {
            setPaymentInfo({...paymentInfo, expiryYear : e.target.value});
        }
     };


    return(
        <div>{ !successFlag && destFlag &&
        
            
        
        <form autoComplete="off" noValidate onSubmit={Submit}>
        <Navbar/>
            <h1 variant="h5">Confirm Payment of {amount}€</h1>
            <div>{message}</div>
            <TextField  name="Cardholder's Name" label="Cardholder's Name"   variant="outlined"  value={paymentInfo.name} onChange={(e) => setPaymentInfo({...paymentInfo, custName : e.target.value})}/><br/><br/>
            <TextField  name="Card Number"  variant="outlined" label="Card Number"  value={paymentInfo.cardNo} onChange={onChangeCard}/><br/>
            <TextField  name="CVV" type="password"  label="CVV" margin="dense" style={{width: 70}}  variant="outlined"  value={paymentInfo.cvv} onChange={onChangeCvv}/> <element className="bb"></element>
            <TextField  name="Expiry Date"  margin="dense" style={{width: 50}} variant="outlined" label="MM"  value={paymentInfo.expiryMonth} onChange={onChangeM}/> <element className="bb"></element>
            <TextField  name="Expiry Date"  margin="dense" style={{width: 50}} variant="outlined" label="YY"  value={paymentInfo.expiryYear} onChange={onChangeY}/><br/>
           
            <button onClick={Submit} className={classes.buttonSubmit}>Pay</button>
            <Footer/>
        </form>
    }
    {successFlag && destFlag && <h5>Payment Successful, redirecting...</h5>}
    {!destFlag && <h3>Forbidden</h3>}

    </div>
        )

}

export default PaymentForm;