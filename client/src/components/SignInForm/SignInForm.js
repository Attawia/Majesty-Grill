import react from 'react';
import {TextField, Button, Paper, Typography} from '@material-ui/core';
import makeStyles from './styles';
import {signIn} from '../../actions/SignInForm.js'
import { Link } from 'react-router-dom';
import { authorize,isGuest,getUsername } from '../../api/auth.js';
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Footer/Footer.js';

const FlightForm = () => {
    const [userData,setUserData] = react.useState({
        username :'',
        password :'',
    })
    const [errorMessage, setErrorMessage] = react.useState('');
    const classes = makeStyles();
    const Guest = async (e) =>{
        const user = {username:"Guest",password:"Guest"};
        e.preventDefault();
        const promise = await signIn(user);
        const flag = promise.data;
        console.log(flag);
        if(!flag){
            setErrorMessage("Incorrect username or password");
        }
        else{
            localStorage.setItem('token',flag);
            window.location.href='/userSearch'; 
        }
        
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
            window.location.href='/userSearch/';
        }
        //sheel el if else w here

        
    };
    
    return(
    <Paper>
        <Navbar/>
        <form autoComplete="off" noValidate onSubmit={Submit}>
            <h1>Sign In</h1>
            <Typography >{errorMessage}</Typography><br/>
            <TextField  name="Username"  variant="outlined" label="Username"  value={userData.username} onChange={(e) => setUserData({...userData, username : e.target.value})}/><br/><br/>
            <TextField  name="Password"  label="Password" type="password" variant="outlined"  value={userData.password} onChange={(e) => setUserData({...userData, password : e.target.value})}/><br/><br/>
            <button onClick={Submit}>Sign In</button><br/><br/>
            <button onClick={Guest} >Continue as guest</button><br/><br/>
            <Link to="/register">Not a user? Register Here!</Link>

        </form>
        <Footer/>
    </Paper>
        )
}

export default FlightForm;