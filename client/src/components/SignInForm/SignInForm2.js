import react from 'react';
import {TextField, Button, Paper, Typography} from '@material-ui/core';
import makeStyles from './styles';
import {signIn} from '../../actions/SignInForm.js'
import {Link,useLocation,useHistory} from "react-router-dom";
import { authorize,isGuest,getUsername } from '../../api/auth.js';
import Navbar from '../Navbar/EmptyNavbar.js';
import Footer from '../Footer/Footer.js';

const SignInForm2 = () => {

    const history = useHistory();
    const location = useLocation();

    const [userData,setUserData] = react.useState({
        username :'',
        password :'',
    })
    const [errorMessage, setErrorMessage] = react.useState('');
    const classes = makeStyles();

    const {depFlight} = location.state;
    const {retFlight} = location.state;
    const {reservation} = location.state;

    const goToSeating = () =>{
        let priceDepFlight = 0;
        let priceRetFlight = 0;
        if(reservation.cabinDeparture == 'Economy'){
            if(reservation.cabinReturn == 'Economy'){
                priceDepFlight = depFlight.priceEconomy
                priceRetFlight = retFlight.priceEconomy
            }
            else{
                priceDepFlight = depFlight.priceEconomy
                priceRetFlight = retFlight.priceBusiness
            }
        }
        else{
            if(reservation.cabinReturn == 'Economy'){
                priceDepFlight = depFlight.priceBusiness
                priceRetFlight = retFlight.priceEconomy
            }
            else{
                priceDepFlight = depFlight.priceBusiness
                priceRetFlight = retFlight.priceBusiness
            }
        }
        let price = (priceDepFlight * reservation.passengers) + (priceRetFlight * reservation.passengers);
        let to = "/departureSeats/";

        history.push({ 
            pathname: "/payment2" ,
            state : {depFlight,retFlight,reservation,price,to}
        });
    }


    const Submit = async (e) =>{
        e.preventDefault();
        const promise = await signIn(userData);
        const flag = promise.data;
        if(!flag){
            setErrorMessage("Incorrect username or password");
        }
        else{
            localStorage.setItem('token',flag.token);
            if(userData.username == 'Administrator')
                window.location.href='/flights/';
            else
            goToSeating();
        }
        //sheel el if else w here

        
    };
    
    return(
    <Paper>
        <Navbar/>
        <form autoComplete="off" noValidate onSubmit={Submit} align='center'>
            <h1>Sign In</h1>
            <Typography >{errorMessage}</Typography><br/>
            <TextField  name="Username"  variant="outlined" label="Username"  value={userData.username} onChange={(e) => setUserData({...userData, username : e.target.value})}/><br/><br/>
            <TextField  name="Password"  label="Password" type="password" variant="outlined"  value={userData.password} onChange={(e) => setUserData({...userData, password : e.target.value})}/><br/><br/>
            <button onClick={Submit} className={classes.buttonSubmit}>Sign In</button><br/><br/>
            {/* Going to fake Register to create an account and then proceed to payment then seating */}
            <Link to={{ 
                pathname: "/Register2" ,
                state : {depFlight,retFlight,reservation}
            }}>
                    Not a user? Register Here!
            </Link>

        </form>
        <Footer/>
    </Paper>
        )
}

export default SignInForm2;