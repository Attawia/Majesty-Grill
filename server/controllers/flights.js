import Flight from '../models/Flight.js'
import Reservation from '../models/Reservation.js'

export const getCreate = (req,res) => {
    res.send('page el create');

};

export const createFlight = async (req,res) => {
    let flight = req.body;
    let business = flight.businessSeats;    
    let economy = flight.economySeats;
    let departure = new Date(flight.departureTime);
    let arrival = new Date(flight.arrivalTime);
    let duration = (arrival - departure) / 3600000;
    console.log(departure);
    console.log(arrival);
    console.log(duration);
    flight={...flight,freeEconomySeats:economy,freeBusinessSeats:business,tripDuration:duration};
    const newFlight = new Flight(flight);
    let seats=[{seatName:1,state: false}];
    let i=2;
    while(i<=business){
        seats.push({seatName: i,state:false});
        i++;
    }
    let j = 0;
    while(j<economy){
        seats.push({seatName: j+i,state:false});
        j++;
    }
    newFlight.seats=seats;
    try {
        await newFlight.save();

        res.status(201).json(newFlight);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

 export const addReservation= async (req,res)=>{
    let reservation= req.body;
    const newReservation= new Reservation(reservation);
    try{
        await newReservation.save();
        res.status(201).json(newReservation);
    }
    catch(error){
        res.status(409).json({message: error.message});
    }

}

export const updateReservation = async(req,res)=>{
    const _id=req.body._id;
    const reservation = req.body.res;
    try{
        await Reservation.findByIdAndUpdate(_id,reservation);
        res.status(201).json(newReservation);
    }
    catch(error){
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




export const reserveSeats= async(req,res)=>{
    const seats=req.body.seats;
    const _id= req.body._id;
    const num = seats.length;
    try{
        const flight= await Flight.findById(_id);
        const seatarray=flight.seats;
        for(const seat of seatarray){
            for(const num of seats){
                if(num==seat.seatName){
                    seat.state=true;
                    if(seat.seatName<flight.businessSeats){
                        flight.freeBusinessSeats--;
                    }
                    else{
                        flight.freeEconomySeats--;
                    }
                    break;
                }
            }
        }
        flight.seats=seatarray;
        console.log(flight);
        await Flight.findByIdAndUpdate(_id,flight);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

export const emptySeats = async(req,res)=>{
    const _id= req.body._id;
    const seats = req.body.seats;
    try{
        const flight =  await Flight.findById(_id);
        let seatarray = flight.seats;
        console.log(seatarray);
        for(const seat of seats){
            for(const seat2 of seatarray){
                if(seat==seat2.seatName){
                    seat2.state=false;
                }
            }
        }
        flight.seats=seatarray;
         await Flight.findByIdAndUpdate(_id,flight);

    }
    catch(error){
        res.status(409).json({message:error.message});
    }
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
