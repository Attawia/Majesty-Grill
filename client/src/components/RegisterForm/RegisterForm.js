import react from 'react';
import {TextField, Button, Paper, Typography} from '@material-ui/core';
import makeStyles from './styles';
import {Register} from '../../actions/RegisterForm.js'
import { Link } from 'react-router-dom';

/*
ok so, registration is actually a requirement in sprint 3, but to avoid a hassle in registering users to use in testing all
requirements in sprint 2, I implemented a really rough version of the registration, please input all values correctly as no
input validation whatsoever exists, as it will be added in the next sprint
*/



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
        
    })
    const [errorMessage, setErrorMessage] = react.useState('');
    const classes = makeStyles();
    
    const Submit = async (e) =>{
        e.preventDefault();
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
                
            })
        }
        
    };

    return(
        
    <Paper>
        <Link to={`/`}>
            <button>
                Back 
                </button>
            </Link>
        <form autoComplete="off" noValidate onSubmit={Submit}>
            <h1>Register</h1>
            <Typography >{errorMessage}</Typography><br/>
            <TextField  name="Username"  variant="outlined" label="Username"  value={userData.username} onChange={(e) => setUserData({...userData, username : e.target.value})}/><br/><br/>
            <TextField  name="Password"  type="password" label="Password" variant="outlined"  value={userData.password} onChange={(e) => setUserData({...userData, password : e.target.value})}/><br/><br/>
            <TextField  name="First Name"  variant="outlined" label="First Name"  value={userData.firstName} onChange={(e) => setUserData({...userData, firstName : e.target.value})}/><br/><br/>
            <TextField  name="Last Name"  label="Last Name" variant="outlined"  value={userData.lastName} onChange={(e) => setUserData({...userData, lastName : e.target.value})}/><br/><br/>
            <TextField  name="Address"  variant="outlined" label="Address"  value={userData.address} onChange={(e) => setUserData({...userData, address : e.target.value})}/><br/><br/>
            <TextField  name="Country Code"  label="Country Code" variant="outlined"  value={userData.countryCode} onChange={(e) => setUserData({...userData, countryCode : e.target.value})}/><br/><br/>
            <TextField  name="Telephone Number"  variant="outlined" label="Telephone Number"  value={userData.telephoneNo} onChange={(e) => setUserData({...userData, telephoneNo : e.target.value})}/><br/><br/>
            <TextField  name="Email"  label="Email" variant="outlined"  value={userData.email} onChange={(e) => setUserData({...userData, email : e.target.value})}/><br/><br/>
            <TextField  name="Passport Number"  variant="outlined" label="Passport Number"  value={userData.passportNo} onChange={(e) => setUserData({...userData, passportNo : e.target.value})}/><br/><br/>
            <Button onClick={Submit} className={classes.buttonSubmit}>Register</Button><br/><br/>
            <Link to="/">Already a user? Sign In!</Link>

        </form>
    </Paper>
        )
}

export default FlightForm;