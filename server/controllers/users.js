
import Reservation from '../models/Reservation.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const getUserEmail = async (req, res)=>
{
    const currUser = req.params.user;
    try
    {
        const user = await User.find({username:currUser});
        const  email = user[0].email;
        res.status(201).json(email);
    }
    catch(error)
    {
        res.status(409).json({message: error.message});
    }
}

export const getTheLastReservation = async (req, res)=>
{
    //get the id of this specific flight from the database
    //el mfrood currUser da yb2a gy mn el authentication token msh parameter mn el URL
    const currUser = req.params.user;
    try {
        console.log(currUser);
        const reservations = await Reservation.find({userName: currUser});
        const lastReservation = reservations[reservations.length - 1];
        console.log(lastReservation)
    res.status(201).json(lastReservation);
   
        
    } catch (error) {
        res.status(409).json({message:error.message});
    }
    


}


export const getAllReservations = async (req, res)=>
{
    const currUser = req.params.user;
    try
    {
    const reservations = await Reservation.find({userName: currUser});
    res.status(200).json(reservations);
    }
    catch (error) 
    {
    res.status(404).json({message:error.message});
    }

}

export const cancelReservation = async (req, res)=>
{
    const id = req.params.id;

    Reservation.findByIdAndDelete(id)
      .then((result)=>
      {
          console.log("inside cancel reservation method: " + result);
      })
      .catch(err=> console.log(err));
}



export const getUserById = async(req, res)=>{
    //const id = req.params.id;
    const token = req.body.token;
    let username = '';
    try{
         username = jwt.verify(token,'majesty');
        }
        catch(error){
             username = "Guest";
        }
    const user = await User.findOne({username:username});
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
    const token = req.body.token;
    let username = '';
    try{
         username = jwt.verify(token,'majesty');
        }
        catch(error){
             username = "Guest";
        }
    try{
        const user = await User.findOne({username:username});
        res.send(user);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}





