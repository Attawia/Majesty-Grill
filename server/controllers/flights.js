

import Flight from '../models/Flight.js';


 export const flightDelete=(req, res)=>
{
    const id = req.params.id;

    Flight.findByIdAndDelete(id)
      .then((result)=>
      {
          console.log(result);
      })
      .catch(err=> console.log(err));
}

export const updateFlight = async (req,res) =>{
    const _id = req.body._id; 
    const updatedflight = req.body.flight;
    try{
        await Flight.findByIdAndUpdate(_id,updatedflight);
        res.status(201).json(updatedflight);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }    
}


export const getUpdateFlight = async (req,res) =>{
    const _id = req.body;
    try{
        const flight = await Flight.findById(_id);
        res.send(flight);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

export const searchAllFlights = async (req,res) => {
    try {
        const allFLights = await Flight.find();
        
        console.log(allFLights);
    
        res.status(200).json(allFLights);
    } catch (error) {
        res.status(404).json({message : error.message});
    }
    };
    
    export const searchFlights = async (req,res) => {
        try {
            const searchedFLights = await Flight.find(req.body);
            
            console.log(searchedFLights);
        
            res.status(200).json(searchedFLights);
        } catch (error) {
            res.status(404).json({message : error.message});
        }
        };
