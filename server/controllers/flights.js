import Flight from '../models/Flight.js';


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

