import * as api from '../api';

export const createFlight = (flight) => async (dispatch) => {
    try {
        const { data } = await api.createFlight(flight);

        dispatch({type:"CREATE",payload:data});
    } catch (error) {
        
    }
}

