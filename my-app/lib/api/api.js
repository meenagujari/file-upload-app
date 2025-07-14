import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const register = (userData) => api.post('/users/register', userData);
export const login = (userData) => api.post('/users/login', userData);
export const uploadFile = (fileData) => api.post('/files/upload', fileData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default api;