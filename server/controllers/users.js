import User from '../models/User.js'




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


