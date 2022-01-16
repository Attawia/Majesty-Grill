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
            
        
            res.status(200).json(searchedFLights);
        } catch (error) {
            res.status(404).json({message : error.message});
        }
        };


        export const searchFlightsUser = async (req,res) => {
            const wholeCriteria = req.body;
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

        export const editReservationDep = async (req,res) => {
            try {
                if(req.body.type === 'Departure'){
                    if(req.body.departureTime == ''){
                        const searchedFLights = await Flight.find({
                            departureTime: { $lt: req.body.timeRes },
                            depAirport: req.body.depAirport,
                            arrAirport: req.body.arrAirport
                        });
                        
                        res.status(200).json(searchedFLights);
                    }
                    else{
                        let date = req.body;
                        let part1 = date.departureTime.substring(0,8);
                        let num = parseInt(date.departureTime.substring(8,10));
                        num += 1;
                        let part2 = date.departureTime.substring(10,24);
                        if(num < 10){
                            num = '0' + '' + num
                        }
                        let otherDate = part1 + '' + num + '' + part2;

                        console.log(date);
                        console.log(otherDate);
    
                        const searchedFLights = await Flight.find({
                            $or: [ { departureTime: { $gt: date.departureTime } }, { departureTime: date.departureTime } ],
                            departureTime: { $lt: otherDate },
                            depAirport: req.body.depAirport,
                            arrAirport: req.body.arrAirport
                        });
                        
                    
                        res.status(200).json(searchedFLights);
                    }
                }
                else{
                    if(req.body.departureTime == ''){
                        const searchedFLights = await Flight.find({
                            departureTime: { $gt: req.body.timeRes },
                            depAirport: req.body.depAirport,
                            arrAirport: req.body.arrAirport
                        });
                        
                        res.status(200).json(searchedFLights);
                    }
                    else{
                        let date = req.body;
                        let part1 = date.departureTime.substring(0,8);
                        let num = parseInt(date.departureTime.substring(8,10));
                        num += 1;
                        let part2 = date.departureTime.substring(10,24);
                        if(num < 10){
                            num = '0' + '' + num
                        }
                        let otherDate = part1 + '' + num + '' + part2;
    
                        const searchedFLights = await Flight.find({
                            $or: [ { departureTime: { $gt: date.departureTime } }, { departureTime: date.departureTime } ],
                            departureTime: { $lt: otherDate },
                            depAirport: req.body.depAirport,
                            arrAirport: req.body.arrAirport
                        });
                        
                    
                        res.status(200).json(searchedFLights);
                    }
                }
                
            } 
            catch (error) {
                res.status(404).json({message : error.message});
            }
            };
