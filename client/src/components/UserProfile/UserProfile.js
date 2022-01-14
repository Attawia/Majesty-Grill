import {  useParams,Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetUserById } from "../../actions/index.js";
import {isGuest,validateID} from "../../api/auth.js"
import {getUsername} from './../../api/auth.js'

import api from "../../api/index.js";

const UserProfile = () => {
    const [flag, setFlag] = useState(true);
    const {id} = useParams();
    const [user, setUser] = useState(null);

    const [backButtonAdmin, setBackButtonAdmin] = useState(false);

    const getUserNameHere = async() =>{
        const promise = await getUsername();
        return promise;
    }



    const [allowed,setAllowed] = useState(false);
    const [alreadyChecked,setAlreadyChecked] = useState(false);

    useEffect(()=>
    {
    const isAllowed = async () =>{
        const flag = await isGuest();
        console.log(flag);
        if(!alreadyChecked){
            setAllowed(!flag);
            setAlreadyChecked(true);
        }

    }

    isAllowed();
    },[alreadyChecked])
    //const [userName,setUserName] = useState('useeerrr');


    
    
    useEffect(()=>
    {
     const getTheUser = async () =>
     {
        const theUser = await GetUserById(); 
        if(theUser) setUser(theUser);
     }     
        getTheUser();
    },[])

    useEffect(()=>
    {
        if(user && user.username === 'Administrator'){
            setBackButtonAdmin(true);
         }
        
    },[user])


    return ( 
    <div> {allowed && <div>
        { backButtonAdmin && <Link to={`/flights/`}>
            <button>
                Back
                </button>
            </Link>}

            { (!backButtonAdmin) && <Link to={`/UserSearch`}>
            <button>
                Back
                </button>
            </Link>}

        <h1>Your Profile</h1>    
        {user &&
    <table border = '1'>
        <tr>
        <th>Username</th>
        <td>{user.username}</td>
        </tr>

        <tr>
            <th>First Name</th>
            <td>{user.firstName}</td>

        </tr>

        <tr>
            <th>Last Name</th>
            <td>{user.lastName}</td>
        </tr>

        <tr>
            <th>Address</th>
            <td>{user.address}</td>
        </tr>

        <tr>
             <th>Telephone Number</th>
             <td>+{user.countryCode}{user.telephoneNo}</td>
        </tr>

        <tr>
            <th>Email</th>
            <td>{user.email}</td>
        </tr>

        <tr>
            <th>Passport Number</th>
            <td>{user.passportNo}</td>
        </tr>
    </table>
}

<Link to={`/users/updateUser/`}>
        <button>
             Update Details
             </button>
        </Link>
        <Link to={`/users/changePassword/`}>
        <button>
             Change Password 
             </button>
        </Link>
    </div>}
    {!allowed && <div> <Link to={`/`}>
            <button>
                Sign In
                </button>
            </Link>
            <h3>Forbidden</h3> </div>}
    </div>
     );
}
 
export default UserProfile;