import Reservation from '../models/Reservation.js';
import User from '../models/User.js';


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
        const reservations = await Reservation.find({userName: currUser});
        const lastReservation = reservations.at(-1);
     
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


