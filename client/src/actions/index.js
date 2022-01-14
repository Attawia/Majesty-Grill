import api from "../api/index";

export const GetFlights = async ()=>
{
    const response = await api.get('/flights');
    return response.data;
    
}

export const GetFlightById = async(id)=>
{
    const response = await api.get('/flights/'+id);
    return response.data;

}
export const GetUserById = async()=>
{
    const request = {token:localStorage.getItem('token')};
    const response = await api.post('/users/',request);
    return response.data;

}
