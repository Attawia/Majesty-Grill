import react from 'react';
import {TextField, Button, Paper, Typography} from '@material-ui/core';
import makeStyles from './styles';
import {signIn} from '../../actions/SignInForm.js'
import { Link } from 'react-router-dom';

const FlightForm = () => {
    const [userData,setUserData] = react.useState({
        username :'',
        password :'',
    })
    const [errorMessage, setErrorMessage] = react.useState('');
    const classes = makeStyles();
    const Submit = async (e) =>{
        e.preventDefault();
        const promise = await signIn(userData);
        const flag = promise.data;
        if(!flag){
            setErrorMessage("Incorrect username or password");
        }
        else{
           window.location.href='/flights'; 
        }
        
    };

    return(
    <Paper>
        <form autoComplete="off" noValidate onSubmit={Submit}>
            <h1>Sign In</h1>
            <Typography >{errorMessage}</Typography><br/>
            <TextField  name="Username"  variant="outlined" label="Username"  value={userData.username} onChange={(e) => setUserData({...userData, username : e.target.value})}/><br/><br/>
            <TextField  name="Password"  label="Password" type="password" variant="outlined"  value={userData.password} onChange={(e) => setUserData({...userData, password : e.target.value})}/><br/><br/>
            <Button onClick={Submit} className={classes.buttonSubmit}>Sign In</Button><br/><br/>
            <Link to="/register">Not a user? Register Here!</Link>

        </form>
    </Paper>
        )
}

export default FlightForm;