import axios from 'axios';

export const load = async({cookies}) => {
    delete axios.defaults.headers.common['Authorization'];
    cookies.delete("drilltekUser",{path:"/"});
};