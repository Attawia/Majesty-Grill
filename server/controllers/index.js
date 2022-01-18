import User from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req,res) => {
    const user = req.body;
    user.password = await bcrypt.hash(user.password,10);
    const newUser = new User(user);
    const alreadyUsername = await User.find({username: newUser.username});
    const alreadyPassport = await User.find({passportNo : newUser.passportNo});
    const alreadyTelephone = await User.find({telephoneNo: newUser.telephoneNo});
    const alreadyEmail = await User.find({email: newUser.email});
    if(!!alreadyUsername || !!alreadyEmail || !!alreadyTelephone || !!alreadyPassport){res.send(false)}
    else{
        await newUser.save();
        res.send(true);
    }
}

export const signIn = async (req,res) => {
    const user = req.body;
    const newUser = new User(user);
    const currUser = await User.findOne({username: user.username});
    if(!currUser){
        res.send(false);

    }
    else{
        bcrypt.compare(newUser.password,currUser.password).then(isCorrect =>{
            if(isCorrect){
                const accessToken = jwt.sign(user.username,'majesty');
                console.log(accessToken);
                console.log(jwt.verify(accessToken,'majesty'));
                res.json({token:accessToken,id:currUser._id});
            }
            else{
                res.send(false);
            }

        });

    }
}

    export const updateUser = async (req,res) =>{
        const _id = req.body._id; 
        const updatedUser = req.body.user;
        try{
            await User.findByIdAndUpdate(_id,updatedUser);
            res.status(201).json(updatedUser);
        }
        catch(error){
            res.status(409).json({message:error.message});
        }    
    }
    
    
    export const getUpdateUser = async (req,res) =>{
        const _id = req.body;
        try{
            const user = await User.findById(_id);
            res.send(user);
        }
        catch(error){
            res.status(409).json({message:error.message});
        }
    }
