import axios, { AxiosInstance } from 'axios';

const HttpApi: AxiosInstance = axios.create({
    baseURL: 'https://wuerth.by/sws_rest',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default HttpApi;