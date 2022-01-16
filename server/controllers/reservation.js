import Reservation from '../models/Reservation.js'

export const updateReservation = async (req,res) =>{
    const _id = req.body._id; 
    const updatedreservation = req.body.reservation;
    try{
        await Reservation.findByIdAndUpdate(_id,updatedreservation);
        res.status(201).json(updatedreservation);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }    
}
