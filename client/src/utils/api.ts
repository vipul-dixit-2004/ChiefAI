import axios from "axios";

const api = axios.create({
    baseURL: 'https://chiefai.onrender.com',
    withCredentials: true
});

export default api;
