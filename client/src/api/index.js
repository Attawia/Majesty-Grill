import axios from 'axios';



export const createFlight = (newFlight) => {
    const res = axios.post('http://localhost:5000/flights/createFlight', newFlight);
    return res;
};

export const signIn = (user) =>{
    const res =  axios.post('http://localhost:5000/',user);
    return res;
};
export const Register = (user) =>{
    const res =  axios.post('http://localhost:5000/register',user);
    return res;
};


export const makePayment = (amount) =>{
    const res = axios.post('http://localhost:5000/payment/makePayment',amount);
    return res;
}


export default axios.create({
    baseURL: 'http://localhost:5000/'
})


