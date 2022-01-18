import react from 'react';
import {TextField, Button, Paper, Typography} from '@material-ui/core';
import useStyles from './styles.js';
import {Link,useHistory,useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import { makePayment } from '../../actions/paymentForm'


const amount = 100
const amountE = amount + '€'; 

const PaymentForm = () => {
    const history = useHistory();
    const location = useLocation();
    const {depFlight} = location.state;
    const {retFlight} = location.state;
    const {reservation} = location.state;
    const {price} = location.state;
    const {to} = location.state;

    console.log("1 " + price);
    const [amount,setAmount] = react.useState(0);

    useEffect(()=>
    {
        setAmount(price);
    console.log("2 " + price);

    },[price]);

    const [paymentInfo,setPaymentInfo] = react.useState({
        cardNo : "",
        custName : "",
        cvv : "",
        expiryMonth : "",
        expiryYear : "",
    });

    const [message,setMessage] = react.useState("");

    const [successFlag,setSuccessFlag] = react.useState(false);

    const classes = useStyles();


    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const Submit = async (e) =>{
        setMessage("");
        e.preventDefault();
        if(paymentInfo.cardNo.length != 16){
            message += "Card number invalid \n";
        }
        const namere = /[a-zA-Z]+\s[a-zA-Z]+[\s[a-zA-Z]*/;
        if(!(namere.test(paymentInfo.custName))){
            setMessage(message += "Name invalid \n");
        }
        if(paymentInfo.cvv.length != 3){
            setMessage(message += "CVV invalid \n");
        }
        if(paymentInfo.expiryMonth < 1 || paymentInfo.expiryMonth >12){
            setMessage(message += "Month should be between 1 and 12");
        }
        if(paymentInfo.expiryYear < 22){
            setMessage(message += "Expiry Year cannot be in the past");
        }
        if(message == ""){
        const res = await makePayment({amount: amount*100});
        if(res.status == 200){
            setSuccessFlag(true);
        }
        await timeout(1000);
        history.push({
            pathname: to,
            state:{reservation,depFlight,retFlight}
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
        <div>{ !successFlag &&
        <Paper>
        <form autoComplete="off" noValidate onSubmit={Submit}>
        <Link to={`/flights/`}>
            <button>
                Home 
                </button>
            </Link>
            <h1 variant="h5">Confirm Payment of {amount}€</h1>
            <h1 variant="h5">{message}</h1>
            <TextField  name="Cardholder's Name" label="Cardholder's Name"   variant="outlined"  value={paymentInfo.name} onChange={(e) => setPaymentInfo({...paymentInfo, custName : e.target.value})}/><br/><br/>
            <TextField  name="Card Number"  variant="outlined" label="Card Number"  value={paymentInfo.cardNo} onChange={onChangeCard}/><br/>
            <TextField  name="CVV" type="password"  label="CVV" margin="dense" style={{width: 70}}  variant="outlined"  value={paymentInfo.cvv} onChange={onChangeCvv}/> 
            <TextField  name="Expiry Date"  margin="dense" style={{width: 50}} variant="outlined" label="MM"  value={paymentInfo.expiryMonth} onChange={onChangeM}/>
            <TextField  name="Expiry Date"  margin="dense" style={{width: 50}} variant="outlined" label="YY"  value={paymentInfo.expiryYear} onChange={onChangeY}/><br/>
           
            <Button onClick={Submit} className={classes.buttonSubmit}>Pay</Button>

        </form>
    </Paper>}
    {successFlag && <h3>Payment Successful, redirecting...</h3>}
    </div>
        )

}

export default PaymentForm;