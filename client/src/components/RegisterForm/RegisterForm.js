import react from 'react';
import {TextField, Button, Paper, Typography} from '@material-ui/core';
import makeStyles from './styles';
import {Register} from '../../actions/RegisterForm.js'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/EmptyNavbar.js';
import Footer from '../Footer/Footer.js';


const FlightForm = () => {
    
//------------------------------------------------
    const [userData,setUserData] = react.useState({
        username :'',
        password :'',
        firstName : '',
        lastName : '',
        address : '',
        countryCode : '',
        telephoneNo : '',
        email : '',
        passportNo : '',
        reservations: [],
        
    })
    let [errorMessage, setErrorMessage] = react.useState('');
    const classes = makeStyles();
    
    const Submit = async (e) =>{
        e.preventDefault();
        setErrorMessage("");
        const emailre = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        if(!(emailre.test(userData.email))){
            setErrorMessage(errorMessage += "Invalid email");
        }
        if(userData.address.length == 0){
            setErrorMessage(errorMessage += "Invalid address");
        }
        if(errorMessage==""){
            const promise = await Register(userData);
            const flag = promise.data;
            if(!flag){
                setErrorMessage("User already exists");
            }
            else{
                setUserData({
                    username :'',
                    password :'',
                    firstName : '',
                    lastName : '',
                    address : '',
                    countryCode : '',
                    telephoneNo : '',
                    email : '',
                    passportNo : '',
                    reservations: [],
                    
                })
                window.location.assign('/');
                //here
            } 
        }   
        
    };


    const onChangeUsername = (e) => {
        const re = /^[a-zA-Z0-9_.-]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setUserData({...userData, username : e.target.value});
        }
     };
     const onChangePassword = (e) => {
        const re = /^\S*$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setUserData({...userData, password : e.target.value});
        }
     };
     const onChangeFirst = (e) => {
        const re = /^(?!.* )([a-zA-Z]+)$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setUserData({...userData, firstName : e.target.value});
        }
     };
     const onChangeLast = (e) => {
        const re = /^(?!.* )([a-zA-Z]+)$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setUserData({...userData, lastName : e.target.value});
        }
     };
     const onChangeCC = (e) => {
        const re = /^(?!.* )([0-9]+)$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setUserData({...userData, countryCode : e.target.value});
        }
     };
     const onChangePhone = (e) => {
        const re = /^(?!.* )([0-9]+)$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setUserData({...userData, telephoneNo : e.target.value});
        }
     };
     const onChangePassport = (e) => {
        const re = /^(?!.* )([A-Z0-9]+)$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setUserData({...userData, passportNo : e.target.value});
        }
     };

    return(
        
    <Paper>
        <Navbar/>
        <Link to={`/`}>
            <button>
                Back 
                </button>
            </Link>
        <form autoComplete="off" noValidate onSubmit={Submit} align='center'>
            <h1>Register</h1>
            <Typography >{errorMessage}</Typography><br/>
            <TextField  name="Username"  variant="outlined" label="Username"  value={userData.username} onChange={onChangeUsername}/><br/><br/>
            <TextField  name="Password"  type="password" label="Password" variant="outlined"  value={userData.password} onChange={onChangePassword}/><br/><br/>
            <TextField  name="First Name"  variant="outlined" label="First Name"  value={userData.firstName} onChange={onChangeFirst}/><br/><br/>
            <TextField  name="Last Name"  label="Last Name" variant="outlined"  value={userData.lastName} onChange={onChangeLast}/><br/><br/>
            <TextField  name="Address"  variant="outlined" label="Address"  value={userData.address} onChange={(e) => setUserData({...userData, address : e.target.value})}/><br/><br/>
            <TextField  name="Country Code"  label="Country Code" variant="outlined"  value={userData.countryCode} onChange={onChangeCC}/><br/><br/>
            <TextField  name="Telephone Number"  variant="outlined" label="Telephone Number"  value={userData.telephoneNo} onChange={onChangePhone}/><br/><br/>
            <TextField  name="Email"  label="Email" variant="outlined"  value={userData.email} onChange={(e) => setUserData({...userData, email : e.target.value})}/><br/><br/>
            <TextField  name="Passport Number"  variant="outlined" label="Passport Number"  value={userData.passportNo} onChange={onChangePassport}/><br/><br/>
            <button onClick={Submit} className={classes.buttonSubmit}>Register</button><br/><br/>
            <Link to="/">Already a user? Sign In!</Link>

        </form>
    </Paper>
        )
}

export default FlightForm;