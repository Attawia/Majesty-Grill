import react from 'react';
import {TextField, Button, Paper, Typography} from '@material-ui/core';
import makeStyles from './styles';
import { validatePassword,changePassword } from '../../api/auth.js';
import {useHistory} from 'react-router-dom';



const PasswordForm = () => {
    const history = useHistory();
    const back = () =>{
        history.go(-1);
    }
    const [userData,setUserData] = react.useState({
        oldPassword :'',
        newPassword :'',
        confirmPassword:'',
    })
    const [errorMessage, setErrorMessage] = react.useState('');
    const classes = makeStyles();
    const Submit = async (e) =>{
        e.preventDefault();
        const flag = await validatePassword(userData.oldPassword);
        if(flag){
            if(userData.newPassword == userData.confirmPassword){
                const res = await changePassword(userData.newPassword);
                window.location.href='/'; 
            }
            else setErrorMessage("passwords do not match");
        }
        else{
            setErrorMessage("Incorrect password");
            console.log("incorrect")
        }
        
    };

    return(
    <Paper>
        <button onClick={back}>
             back 
             </button>
        <form autoComplete="off" noValidate onSubmit={Submit}>
            <h1>Change Password</h1>
            <Typography >{errorMessage}</Typography><br/>
            <TextField  name="Old Password"  variant="outlined" label="Old Password"  type="password"  onChange={(e) => setUserData({...userData, oldPassword : e.target.value})}/><br/><br/>
            <TextField  name="New Password"  label="Password" type="New Password" variant="outlined"  type="password"  onChange={(e) => setUserData({...userData, newPassword : e.target.value})}/><br/><br/>
            <TextField  name="Confirm New Password"  label="Password" type="Confirm New Password" type="password" variant="outlined"   onChange={(e) => setUserData({...userData, confirmPassword : e.target.value})}/><br/><br/>
            <Button onClick={Submit} className={classes.buttonSubmit}>Change Password</Button><br/><br/>

        </form>
    </Paper>
        )
}

export default PasswordForm;