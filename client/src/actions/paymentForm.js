import * as api from '../api';

export const makePayment = async (amount) =>  {
    try {
        const res  = await api.makePayment(amount);
        return res;

    } catch (error) {
        
    }

}
