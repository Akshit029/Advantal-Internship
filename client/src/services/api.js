import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API methods
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
}

export const userAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (userData) => api.post('/users', userData),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
}

export const postAPI = {
  getAll: () => api.get('/posts'),
  getById: (id) => api.get(`/posts/${id}`),
  create: (postData) => api.post('/posts', postData),
  update: (id, postData) => api.put(`/posts/${id}`, postData),
  delete: (id) => api.delete(`/posts/${id}`),
}

// Health check
export const healthCheck = () => api.get('/health')

// Individual export functions for easier imports
export const loginUser = (credentials) => authAPI.login(credentials)
export const registerUser = (userData) => authAPI.register(userData)
export const logoutUser = () => authAPI.logout()
export const getUserProfile = () => authAPI.getProfile()
export const forgotPassword = (email) => authAPI.forgotPassword(email)
export const resetPassword = (data) => authAPI.resetPassword(data)
export const verifyOTP = (data) => authAPI.verifyOTP(data)

export default api 