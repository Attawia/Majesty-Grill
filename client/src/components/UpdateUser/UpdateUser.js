import axios from 'axios';
import { useState, useEffect } from "react";
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import { Link,useHistory} from 'react-router-dom';
import {isGuest, validateID} from "../../api/auth.js";
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Footer/Footer.js';



var done = false;
const UpdateUser =  () => {
    const [flag, setFlag] = useState(false);
    const history = useHistory();
    const {id} = useParams();
    const [user,updateUser] = useState({});

    const getPost = async (id) => {
        const res = await axios.post('http://localhost:5000/users/getUpdateUser',{token:localStorage.getItem('token')});
        const user = res.data;
        if(user.username!=="Guest")setFlag(true);
        return user;
    }
    if(!done){
    const userd = async ()=>{const promise = await getPost(id); return promise;  }
    const userDetails = userd();
    userDetails.then(function(result){
    const userData = result;      
    updateUser(userData);
    });
    }

    done = true;

    const [allowed,setAllowed] = useState(false);
    const [alreadyChecked,setAlreadyChecked] = useState(false);

    useEffect(()=>
    {
    const isAllowed = async () =>{
        const flag = await isGuest();
        if(!alreadyChecked){
            setAllowed(!flag);
            setAlreadyChecked(true);
        }

    }

    isAllowed();
    },[alreadyChecked])

    
   const Submit = (e) =>{

        e.preventDefault(); 
        const updated = {_id:user._id,user:user};
        const x = axios.patch('http://localhost:5000/users/updateUser',updated);
        window.location.href='/';  
        
   }

   //TODO all above is done, change values in html below and implement a user profile page
   
    return(
        <div>
            <Navbar/>
        {allowed && <div>
        {flag && <Paper>
             <Link to={`/users/profile/`}>
            <button>
                Back 
                </button>
            </Link>
            <h1>Update User</h1>
            <form align='center'>
            <TextField  name="Username"  variant="outlined" label="Username" InputLabelProps={{ shrink: true }}  variant="outlined" value={user.username} onChange={(e) => updateUser({...user, username : e.target.value})}/><br/><br/>
            <TextField  name="First Name"  label="First Name" InputLabelProps={{ shrink: true }}  variant="outlined"  value={user.firstName} onChange={(e) => updateUser({...user, firstName : e.target.value})}/><br/><br/>
            <TextField  name="Last Name"  label="Last Name" InputLabelProps={{ shrink: true }}  variant="outlined"  value={user.lastName} onChange={(e) => updateUser({...user, lastName : e.target.value})}/><br/><br/>
            <TextField  name="Address"  variant="outlined" label="Address" InputLabelProps={{ shrink: true }}  variant="outlined" value={user.address} onChange={(e) => updateUser({...user, address : e.target.value})}/><br/><br/>
            <TextField  name="Country Code"  variant="outlined" label="Country Code" InputLabelProps={{ shrink: true }}  variant="outlined"  value={user.countryCode} onChange={(e) => updateUser({...user,CountryCode : e.target.value})}/><br/><br/>
            <TextField  name="Telephone Number"  variant="outlined" label="Telephone Number" InputLabelProps={{ shrink: true }}  variant="outlined" value={user.telephoneNo} onChange={(e) => updateUser({...user, telephoneNo : e.target.value})}/><br/><br/>
            <TextField  name="Email"  variant="outlined" label="Email" InputLabelProps={{ shrink: true }}  variant="outlined" value={user.email} onChange={(e) => updateUser({...user, email : e.target.value})}/><br/><br/>
            <TextField  name="Passport Number"  variant="outlined" label="Passport Number" InputLabelProps={{ shrink: true }}  variant="outlined" value={user.passportNo} onChange={(e) => updateUser({...user, passportNo : e.target.value})}/><br/><br/>
            
            <button onClick={Submit}>Update</button>

        </form>
    </Paper>}
    {!flag && <div>Forbidden</div>}
    </div>}
    {!allowed && <h3>Forbidden</h3>}
    </div>
    )
}
export default UpdateUser;