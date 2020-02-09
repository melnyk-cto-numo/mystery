import axios from 'axios';

const { REACT_APP_URL_API_DEV } = process.env;

const apiBase = axios.create({
    baseURL: `${REACT_APP_URL_API_DEV}`,
});

export default apiBase;
