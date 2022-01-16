
import User from '../models/User.js';
import Reservation from '../models/Reservation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const getUserById = async(req, res)=>{
    const id = req.params.id;
    console.log("here "+id);
    const user = await User.findById(id);
    res.json(user);
}


export const changePassword = async (req,res) =>{
    const token = req.body.token;
    const username = await jwt.verify(token,'majesty');
    console.log(username);
    const password = req.body.password;
    console.log(password)
    const passEncrypted = await bcrypt.hash(password,10);
    const currUser = await User.findOne({username: username});
    currUser.password = passEncrypted;
    await User.findOneAndUpdate({username:username},currUser);
    return res.send(true);
}


export const updateUser = async (req,res) =>{
    const _id = req.body._id; 
    const updatedUser = req.body.user;
    const oldUser = await User.findById(_id);
    console.log("old: "+oldUser.username);  
    console.log("new: "+updatedUser.username);  
    await User.findByIdAndUpdate(_id,updatedUser);
    if(oldUser.username !== updateUser.username){
        updateReservationUsername(oldUser.username,updatedUser.username);
    }

}

const updateReservationUsername = async (oldUsername,newUsername) => {
    await Reservation.updateMany({userName: oldUsername},{userName: newUsername});
}


export const getUpdateUser = async (req,res) =>{
    const _id = req.body;
    try{
        const user = await User.findById(_id);
        res.send(user);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}




export const getTheLastReservation = (req, res)=>
{
    const userID = req.params.id;
    
    User.findById(userID)
        .then((result)=>
        {
            //sending the reservations
            const reservations = (result.reservations);
            
            res.json(reservations.at(-1));
            
        })
        .catch(err=>console.log(err));

}


export const getAllReservations = (req, res)=>
{
    const userID = req.params.id;
    
    User.findById(userID)
        .then((result)=>
        {
            //sending the reservations
           // res.json(result.reservations);
            console.log(result.username);
            
        })
        .catch(err=>console.log(err));


}

