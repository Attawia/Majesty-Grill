import axios from 'axios';


const url = 'http://localhost:5000/flights/createFlight';
export const createFlight = (newFlight) => axios.post(url, newFlight);

export const signIn = (user) =>{
    const res =  axios.post('http://localhost:5000/',user);
    return res;
};
export const Register = (user) =>{
    const res =  axios.post('http://localhost:5000/register',user);
    return res;
};
export default axios.create({
    baseURL: 'http://localhost:5000/'
})


