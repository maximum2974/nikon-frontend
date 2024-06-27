import axios from "axios";

let request = axios.create({
    baseURL: 'http://45.145.228.53:80/api',
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