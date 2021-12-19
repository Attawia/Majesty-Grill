import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const flightSchema = new Schema(
    {
        flightNo : {type: String, required: true,},
        departureTime : {type: Date, required: true,},
        arrivalTime : {type: Date, required: true,},
        economySeats : {type: Number, required: true,},
        businessSeats : {type: Number, required: true,},
        depAirport : {type: String, required: true,},
        arrAirport : {type: String, required: true,},
        seats : {type: Object ,required: true,},
        priceEconomy : {type: Number , required: true},
        priceBusiness : {type: Number, required: true},
        tripDuration : {type: String, required: true},
        freeEconomySeats : {type: Number, required: true,},
        freeBusinessSeats : {type: Number, required: true,},
    }
);


const Flight = mongoose.model('flight', flightSchema);

export default Flight;

