import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_DOMAIN}/api/json/v1/1`,
  headers: {
    'Content-Type': 'Application/json',
  },
});

export { API };
