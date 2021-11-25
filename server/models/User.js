import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username : {type: String, required: true,},
        password : {type: String, required: true,},
        firstName : {type: String, required: true,},
        lastName : {type: String, required: true,},
        address : {type: String, required: true,},
        countryCode : {type: String, required: true,},
        telephoneNo : {type: String, required: true,},
        email : {type: String, required: true,},
        passportNo : {type: String, required: true,},
        
    }
);


const User = mongoose.model('user', userSchema);

export default User;


