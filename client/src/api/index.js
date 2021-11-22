import axios from 'axios';

const url = 'http://localhost:5000/flights/createFlight';
export const createFlight = (newFlight) => axios.post(url, newFlight);
export const signIn = (user) => axios.post('http://localhost:5000/',user);