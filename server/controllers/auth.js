import jwt from 'jsonwebtoken';
import Reservation from '../models/Reservation.js'
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const getUser = (req,res) => {
    const token = req.body.token;
    let user = '';
    try{
        user = jwt.verify(token,'majesty');
    }
    catch(error){
        user = "Guest";
    }
    res.json({username: user});
}
export const validateID = async (req,res) =>{
    const token = req.body.token;
    const username = jwt.verify(token,'majesty');
    const id = req.body.id;
    const user = await User.findOne({username:username});
    if(id==user._id) return res.send(true);
    else return res.send(false);
}
export const validatePassword = async (req,res) =>{
    const password = req.body.password;
    const token = req.body.token;
    const username = jwt.verify(token,'majesty');
    const currUser = await User.findOne({username: username});
    bcrypt.compare(password,currUser.password).then(isCorrect =>{
        return res.send(isCorrect);
    })

}

export const isGuest = (req,res) => {
    const token = req.body.token;
    let username = '';
    try{
         username = jwt.verify(token,'majesty');
        }
        catch(error){
             username = "Guest";
        }
    if(username == 'Guest') return res.send(true);
    else return res.send(false);
}

export const authorize = async (req, res) => {
    const token = req.body.token;
    const route = req.body.route;
    if(token == '') return res.send(false);
    const username = jwt.verify(token, 'majesty');
    const adminFlag = verifyAdmin(route,username);
    //const userSpecificFlag = await verifyUserSpecific(route,username);
    if(adminFlag) return res.send(true);
    //else if(userSpecificFlag == true) return res.send(true);
    else return res.send(false);
    
}

// const verifyUserSpecific = async (route,username) =>{
//     const routeSplit = route.split('/');
//     if(routeSplit[1] == 'users'){
//         const userID = ['SummaryReservation','AllReservations']
//         if(routeSplit[2] == 'cancelRes'){
//             const resID = routeSplit[routeSplit.length - 1];
//             const reservation = await Reservation.findById(resID);
//             if(reservation!== null && reservation.userName == username) return true;
//         }
//         else if(userID.includes(routeSplit[2])){
//             const user = routeSplit[routeSplit.length - 1];
//             if(user == username) return true;
//     }
//     }
//     return false;
// }

const verifyAdmin = (route,username) => {
    const adminRoutes = ["/flights/createFlight","/flights/updateflight","/flights/getupdateflight"];
    const flight = "/flights/:id";
    if(adminRoutes.includes(route)){
        if(username =='Administrator') return true;
    }
    else if(route.split('/')[1] == 'flights' && route.split('/')[2] !== null){
        if(username=='Administrator') return true;
    }
    return false;
}