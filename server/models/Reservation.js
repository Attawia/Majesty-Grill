import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
        userName       : {type : String, required : true},
        dateDeparture  : {type: Date, required: true,}, 
        timeDeparture  : {type: Date, required: true,},
        priceDeparture : {type: Number, required: true},
        cabinDeparture : {type: String, required: true,},
        seatDeparture  : {type: String, required: true,},
        dateReturn     : {type: Date, required: true,},
        timeReturn     : {type: Date, required: true,},
        priceReturn    : {type: Number, required: true},
        cabinReturn    : {type: String, required: true,},
        seatReturn     : {type: String, required: true,},
        totalPrice     : {type: Number, required: true},
    }
);

const Reservation = mongoose.model('reservation', reservationSchema);
export default Reservation;