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
export const GetUserById = async(id)=>
{
    const response = await api.get('/users/'+id);
    return response.data;

}
