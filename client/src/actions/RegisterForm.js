import * as api from '../api';

export const Register = async (user) =>  {
    try {
        const res  = await api.Register(user);
        return res;

    } catch (error) {
        
    }

}
