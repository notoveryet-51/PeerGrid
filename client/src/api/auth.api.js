import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

export const loginUser = async (payload) => {
  const response = await api.post('/auth/login', payload)
  return response.data
}

export const signupUser = async (payload) => {
  const response = await api.post('/auth/register', payload)
  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me')
  return response.data
}
