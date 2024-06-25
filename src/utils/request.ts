import axios from "axios";

let request = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 5000
});

request.defaults.withCredentials = true

request.interceptors.request.use( (config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

request.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default request