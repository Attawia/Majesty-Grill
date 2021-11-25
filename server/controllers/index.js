import User from '../models/User.js'
import bcrypt from 'bcrypt';


export const register = async (req,res) => {
    const user = req.body;
    user.password = await bcrypt.hash(user.password,10);
    const newUser = new User(user);
    const alreadyAccount = await User.find({username: newUser.username}); //need to check more attributes when deploying
    if(!alreadyAccount){res.send(false)}
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
                res.send(true);
            }
            else{
                res.send(false);
            }

        });

    }
}