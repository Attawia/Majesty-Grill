import react from 'react';
import {TextField, Button, Paper, Typography} from '@material-ui/core';
import makeStyles from './styles';
import {signIn} from '../../actions/SignInForm.js'
import {Link,useLocation,useHistory} from "react-router-dom";
import { authorize,isGuest,getUsername } from '../../api/auth.js';

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

        history.push({ 
            pathname: "/departureSeats/" ,
            state : {depFlight,retFlight,reservation}
        });

        window.location.reload();
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
        <form autoComplete="off" noValidate onSubmit={Submit}>
            <h1>Sign In</h1>
            <Typography >{errorMessage}</Typography><br/>
            <TextField  name="Username"  variant="outlined" label="Username"  value={userData.username} onChange={(e) => setUserData({...userData, username : e.target.value})}/><br/><br/>
            <TextField  name="Password"  label="Password" type="password" variant="outlined"  value={userData.password} onChange={(e) => setUserData({...userData, password : e.target.value})}/><br/><br/>
            <Button onClick={Submit} className={classes.buttonSubmit}>Sign In</Button><br/><br/>
            {/* Going to fake Register to create an account and then proceed to seating */}
            <Link to={{ 
                pathname: "/Register2" ,
                state : {depFlight,retFlight,reservation}
            }}>
                    Not a user? Register Here!
            </Link>

        </form>
    </Paper>
        )
}

export default SignInForm2;