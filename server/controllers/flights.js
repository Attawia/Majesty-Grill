import Flight from '../models/Flight.js'

export const getCreate = (req,res) => {
    res.send('page el create');

};

export const createFlight = async (req,res) => {
    const flight = req.body;
    const newFlight = new Flight(flight);
    console.log('here');

    try {
        await newFlight.save();

        res.status(201).json(newFlight);
    } catch (error) {
        res.status(409).json({message: error.message});
        
    }
}
