import Flight from '../models/Flight.js'
import Reservation from '../models/Reservation.js'
import _ from 'lodash';

const getNextDay = (today) =>{
    let split = today.split('-');
    let year = split[0];
    let month = split[1];
    let day = split[2].split('T')[0];
    let leapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);

    switch(month){
        case '01':
        case '03':
        case '05':
        case '07':
        case '08':
        case '10':if(day==31){day=1;month++}else{day++};break;
        case '02':if(leapYear && day==29){day=1;month++}else if(!leapYear && day==28){day=1;month++}else{day++};break;
        case '12':console.log("december");if(day==31){day=1;month=1;year++}else{day++};break;
        default:if(day==30){day=1;month++}else{day++};break;
    }
    if((day+"").length == 1){
        console.log("here");
        day= "0" + day;
    }
    if((month+"").length == 1){
        month= "0" + month;
    }
    let final = year + "-" + month + "-" + day + "T00:00:00.000Z";
    return final;
}

const getIntersection = (Obj1,Obj2) =>{
    let list = [];
    //getting common elements
    for(let i=0;i<Obj1.length;i++){
        for(let j=0; j<Obj2.length ;j++){
            if(_.isEqual(Obj1[i],Obj2[j])){
                list.push(Obj1[i]);
            }
        }
    }
    //removing duplicates
    for(let i = 0; i<list.length-1; i++){
        for(let j=i+1;j<list.length;j++){
            if(_.isEqual(list[i],list[j])){
                list.splice(j--,1);
            }
        }
    }
    return list;
}

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
    const flag = await Flight.findOne({flightNo: flight.flightNo})
    if(flag){
        return res.send(false);
    };
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
    console.log(newReservation);
    try{
        const save=await newReservation.save();
        console.log('here' + save);
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
          
         Reservation.deleteMany({ $or: [ { flightDeparture: result.flightNo }, { flightReturn: result.flightNo } ]})
          .then((result)=>{
              
          })
    
      })
      .catch(err=> console.log(err));

      //
       
    
    
    
}


export const changeSeats=async(req,res)=>{
    console.log('hi');
   const _id=req.body._id;
   const seats = req.body.seats;
   const delseats = req.body.delseats;
   console.log(seats);
   console.log(delseats);
   try{
       const flight = await Flight.findById(_id);
       const seatarray=flight.seats;
       for(const seat of seatarray){
           for(const seat1 of delseats){
               if(seat1==seat.seatName){
                   console.log('delete :' + seat1)
                   seat.state=false;
               }
           }
           for(const seat1 of seats){
            if(seat1==seat.seatName){
                console.log('add :' + seat1)
                seat.state=true;    
            }
        }
    }
       flight.seats=seatarray;
       console.log(flight);
       await Flight.findByIdAndUpdate(_id,flight);
       res.sendStatus(200);
   }
   catch(error){
    res.status(409).json({message:error.message});
   }  
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

export const emptySeats = async(req,res)=>{
    const _id= req.body._id;
    const seats = req.body.delseats;
    console.log(seats);
    try{
        const flight =  await Flight.findById(_id);
        let seatarray = flight.seats;
        console.log('before');
        console.log(seatarray);
        for(const seat of seatarray){
            for(const seat2 of seats){
                if(seat2==seat.seatName){
                    seat.state=false;
                }
            }
        }
        console.log('after');
        console.log(seatarray);
        flight.seats=seatarray;
        console.log(flight);
        await Flight.findByIdAndUpdate(_id,flight);
        res.status(201);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

export const emptySeats2 = async(req,res)=>{
    const flightNo = req.body.flightNo;
    const seats = req.body.seats;
    console.log(flightNo);
    console.log(seats);
    try{
        const flightarray = await Flight.find({flightNo : flightNo});
        const flight = flightarray[0];
        let seatarray=flight.seats;
        const _id = flight._id;
        console.log(seatarray)
        for(const seat of seatarray){
            for(const seat2 of seats){
                if(seat2==seat.seatName){
                    seat.state=false;
                }
            }
        }
        console.log(seatarray);
        flight.seats=seatarray;
        await Flight.findByIdAndUpdate(_id,flight);
        res.status(200);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

export const updateFlight = async (req,res) =>{
    const _id = req.body._id; 
    const updatedflight = req.body.flight;
    const oldFlightNo = req.body.oldFlightNo;

    try{
        await Flight.findByIdAndUpdate(_id,updatedflight);

        await Reservation.updateMany( { flightDeparture : oldFlightNo},

            {timeDeparture: updatedflight.departureTime,
            flightDeparture:updatedflight.flightNo} );
    
        res.status(201).json(updatedflight);
        
    


    await Reservation.updateMany( { flightReturn : oldFlightNo},

        {timeReturn: updatedflight.departureTime,
        flightReturn:updatedflight.flightNo} );

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
        let criteria = req.body
        try {
            let searchedFLights = [];

            if("departureTime" in criteria){
                if("arrivalTime" in criteria){
                    let depTime = criteria.departureTime
                    let arrTime = criteria.arrivalTime
                    await delete criteria.departureTime
                    await delete criteria.arrivalTime
                    let f1 = await Flight.find({
                        $or: [ { departureTime: { $gt: depTime } }, { departureTime: depTime } ],
                        departureTime: { $lt: getNextDay(depTime) },
                        $or: [ { arrivalTime: { $gt: arrTime } }, { arrivalTime: arrTime } ],
                        arrivalTime: { $lt: getNextDay(arrTime) }
                    });
                    let f2 = await Flight.find(criteria);
                    searchedFLights = getIntersection(f1,f2);
                }
                else{
                    let depTime = criteria.departureTime
                    await delete criteria.departureTime
                    console.log(criteria)
                    console.log(depTime)
                    console.log(getNextDay(depTime))
                    let f1 = await Flight.find({
                        $or: [ { departureTime: { $gt: depTime } }, { departureTime: depTime } ],
                        departureTime: { $lt: getNextDay(depTime) }
                    });
                    let f2 = await Flight.find(criteria);
                    searchedFLights = getIntersection(f1,f2);
                }
            }
            else{
                if("arrivalTime" in criteria){
                    let arrTime = criteria.arrivalTime
                    await delete criteria.arrivalTime
                    let f1 = await Flight.find({
                        $or: [ { arrivalTime: { $gt: arrTime } }, { arrivalTime: arrTime } ],
                        arrivalTime: { $lt: getNextDay(arrTime) }
                    });
                    let f2 = await Flight.find(criteria);
                    searchedFLights = getIntersection(f1,f2);
                }
                else{
                    searchedFLights = await Flight.find(criteria);
                }
            }

            res.status(200).json(searchedFLights);
        } catch (error) {
            res.status(404).json({message : error.message});
        }
    };


    export const searchFlightsUser = async (req,res) => {
        const wholeCriteria = req.body;
        const criteria = wholeCriteria.criteria
        console.log(criteria)
        try {
            let searchedFLights = []
            
            if("departureTime" in criteria){
                if("arrivalTime" in criteria){
                    let depTime = criteria.departureTime
                    let arrTime = criteria.arrivalTime
                    await delete criteria.departureTime
                    await delete criteria.arrivalTime
                    let f1 = await Flight.find({
                        $or: [ { departureTime: { $gt: depTime } }, { departureTime: depTime } ],
                        departureTime: { $lt: getNextDay(depTime) },
                        $or: [ { arrivalTime: { $gt: arrTime } }, { arrivalTime: arrTime } ],
                        arrivalTime: { $lt: getNextDay(arrTime) }
                    });
                    let f2 = await Flight.find(criteria);
                    searchedFLights = getIntersection(f1,f2);
                }
                else{
                    let depTime = criteria.departureTime
                    await delete criteria.departureTime
                    console.log(criteria)
                    console.log(depTime)
                    console.log(getNextDay(depTime))
                    let f1 = await Flight.find({
                        $or: [ { departureTime: { $gt: depTime } }, { departureTime: depTime } ],
                        departureTime: { $lt: getNextDay(depTime) }
                    });
                    let f2 = await Flight.find(criteria);
                    searchedFLights = getIntersection(f1,f2);
                }
            }
            else{
                if("arrivalTime" in criteria){
                    let arrTime = criteria.arrivalTime
                    await delete criteria.arrivalTime
                    let f1 = await Flight.find({
                        $or: [ { arrivalTime: { $gt: arrTime } }, { arrivalTime: arrTime } ],
                        arrivalTime: { $lt: getNextDay(arrTime) }
                    });
                    let f2 = await Flight.find(criteria);
                    searchedFLights = getIntersection(f1,f2);
                }
                else{
                    searchedFLights = await Flight.find(criteria);
                }
            }
            
                
         
        
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
                        let otherDate = getNextDay(date.departureTime);

                        console.log(date.departureTime);
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
                        let otherDate = getNextDay(date.departureTime);
    
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
