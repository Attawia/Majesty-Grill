import {  useParams,Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetUserById } from "../../actions/index.js";
import {validateID} from "../../api/auth.js"

import api from "../../api/index.js";

const UserProfile = () => {
    const [flag, setFlag] = useState(false);
    const {id} = useParams();
    const [user, setUser] = useState(null);


    useEffect(()=>
    {
     const getTheUser = async () =>
     {
        const theUser = await GetUserById(id); 
        if(theUser) setUser(theUser);
     }
     const validateId = async () =>{
        setFlag(await validateID(id));
    }
     
        getTheUser();
        validateId();
    },[])

    

    return ( 
    <div> {flag && <div>
        <Link to={`/flights/`}>
            <button>
                Back 
                </button>
            </Link>
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

<Link to={`/users/updateUser/${id}`}>
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
    {!flag && <div> Forbidden </div>}
    </div>
     );
}
 
export default UserProfile;