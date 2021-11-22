import * as api from '../api';

export const signIn = async (user) =>  {
    try {
        const res  = await api.signIn(user);
        return res;

    } catch (error) {
        
    }
}