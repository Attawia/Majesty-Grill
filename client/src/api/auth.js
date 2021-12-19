import axios from 'axios';

export const authorize = async (routeToVerify) =>{
    const request = {token: localStorage.getItem('token'), route:routeToVerify};
    console.log(request);
    const res = await axios.post('http://localhost:5000/auth/',request);
    console.log(res);
    return res.data;

}

export const isGuest = async () =>{
    const request = {token : localStorage.getItem('token')};
    const res = await axios.post('http://localhost:5000/auth/isGuest',request);
    return res.data;
}

export const getUsername = async () =>{
    const request = {token : localStorage.getItem('token')};
    const res = await axios.post('http://localhost:5000/auth/getUser',request);
    return res.data.username;
}

export const validatePassword = async (password) =>{
    const request = {password:password, token:localStorage.getItem('token')};
    const res = await axios.post('http://localhost:5000/auth/validatePassword',request);
    return res.data;
}

export const changePassword = async (password) =>{
    const request = {password:password,token:localStorage.getItem('token')};
    const res = await axios.post('http://localhost:5000/users/changePassword',request);
    return res.data;
}

export const validateID = async (id) =>{
    const request = {id:id,token:localStorage.getItem('token')};
    const res = await axios.post('http://localhost:5000/auth/validateID',request);
    console.log(res);
    return res.data;
}