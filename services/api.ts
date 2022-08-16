import axios from 'axios';

const api = axios.create({
  baseURL: 'https://doar-computador-backend.herokuapp.com',
});

export default api;
