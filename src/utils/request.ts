import axios from "axios";


let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
});

request.interceptors.request.use( (config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

request.interceptors.response.use(
    (response) => {
        if(response?.data?.code === 40100){
            const redirectUrl = window.location.href;
            window.location.href = `/user/login?redirect=${redirectUrl}`;
        }
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default request