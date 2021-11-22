import * as api from '../api';

export const signIn = async (user) =>  {
    try {
        const data = await api.signIn(user);
        return data;

    } catch (error) {
        
    }
}