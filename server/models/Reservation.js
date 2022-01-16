import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
        userName       : {type : String, required : true},


        timeDeparture  : {type: Date, required: true,},
        priceDeparture : {type: Number, required: true},
        cabinDeparture : {type: String, required: true,},
        seatDeparture  : {type: Object, required: true,},
        flightDeparture:{type: String, required: true,},
        
        timeReturn     : {type: Date, required: true,},
        priceReturn    : {type: Number, required: true},
        cabinReturn    : {type: String, required: true,},
        seatReturn     : {type: Object, required: true,},
        flightReturn   : {type: String, required: true,},
        
        totalPrice     : {type: Number, required: true,},
        bookingNumber  : {type: String, required: true,},
        passengers     : {type: Number, required: true,},
        from           : {type: String, required: true,},
        to             : {type: String, required: true,},

    }
);

const Reservation = mongoose.model('reservation', reservationSchema);

export default Reservation;


