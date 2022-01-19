import * as api from '../api';

export const createFlight = async (flight)  => {

    const res = await api.createFlight(flight);
    return res;
}

