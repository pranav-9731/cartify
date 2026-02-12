import axios from 'axios';
import { useI18n } from '../store/i18n';

const rawBaseURL = import.meta.env.VITE_API_URL || '/api';
const baseURL = rawBaseURL.endsWith('/api') ? rawBaseURL : `${rawBaseURL.replace(/\/$/, '')}/api`;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cartify_token');
  
  // Safety check for Zustand state
  const state = useI18n.getState();
  const lang = state?.lang || 'en';

  config.headers = config.headers ?? {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers['Accept-Language'] = lang;

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
