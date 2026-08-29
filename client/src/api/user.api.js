import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('peergrid-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchMyProfile = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const updateMyProfile = async (profileData) => {
  const response = await api.patch('/users/me', profileData);
  return response.data;
};

export const fetchDiscoverPeers = async () => {
  const response = await api.get('/users/discover');
  return response.data;
};