import Flight from '../models/Flight.js'

export const getCreate = (req,res) => {
    res.send('page el create');

};

export const createFlight = async (req,res) => {
    const flight = req.body;
    const newFlight = new Flight(flight);

    try {
        await newFlight.save();

        res.status(201).json(newFlight);
    } catch (error) {
        res.status(409).json({message: error.message});
        
    }
}



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


        export const searchFlightsUser = async (req,res) => {
            const wholeCriteria = req.body;
            console.log(wholeCriteria);
                const criteria = wholeCriteria.criteria
            try {
                
                
                 const searchedFLights = await Flight.find(criteria);

                // for(let i = 0;i < searchedFLights.length;i++){
                //     if(searchedFLights[i].freeEconomySeats < passengersNo && searchedFLights[i].freeBusinessSeats < passengersNo){
                //         searchedFLights.splice(i,1);
                //     }
                // }
            
        
                res.status(200).json(searchedFLights);
            } catch (error) {
                res.status(404).json({message : error.message});
            }
        };

        export const searchReturnFlightsUser = async (req,res) => {
            const depFlight = req.body;
            const departureTime = depFlight.departureTime;
            const depAirport = depFlight.depAirport;
            const arrAirport = depFlight.arrAirport;
            try {
                const searchedFLights = await Flight.find({
                    departureTime: { $gt: departureTime },
                    depAirport: arrAirport,
                    arrAirport: depAirport
                });

                res.status(200).json(searchedFLights);
            } catch (error) {
                res.status(404).json({message : error.message});
            }
        };
