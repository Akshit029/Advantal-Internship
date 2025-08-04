import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
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

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Authentication Service
export const authService = {
  // Register new user
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Login user
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // Get auth token
  getToken() {
    return localStorage.getItem('token')
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token')
  },

  // Refresh token
  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh')
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Forgot password - send reset link
  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Reset password with token
  async resetPassword(token, newPassword) {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        newPassword
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Verify reset token
  async verifyResetToken(token) {
    try {
      const response = await api.get(`/auth/verify-reset-token/${token}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Change password (authenticated user)
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await api.post('/auth/change-password', {
        currentPassword,
        newPassword
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await api.put('/auth/profile', userData)
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get user profile
  async getProfile() {
    try {
      const response = await api.get('/auth/profile')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Delete account
  async deleteAccount(password) {
    try {
      const response = await api.delete('/auth/account', {
        data: { password }
      })
      this.logout()
      return response.data
    } catch (error) {
      throw error
    }
  }
}

// Product Service with token-based authentication
export const productService = {
  // Get all products (with soft delete support)
  async getProducts(params = {}) {
    try {
      const response = await api.get('/products', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get single product
  async getProduct(id) {
    try {
      const response = await api.get(`/products/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Create new product
  async createProduct(productData) {
    try {
      const response = await api.post('/products', productData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Update product
  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/products/${id}`, productData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Soft delete product
  async softDeleteProduct(id) {
    try {
      const response = await api.delete(`/products/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Restore soft deleted product
  async restoreProduct(id) {
    try {
      const response = await api.patch(`/products/${id}/restore`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Permanent delete product
  async permanentDeleteProduct(id) {
    try {
      const response = await api.delete(`/products/${id}/permanent`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Bulk operations
  async bulkDeleteProducts(ids) {
    try {
      const response = await api.post('/products/bulk-delete', { ids })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async bulkRestoreProducts(ids) {
    try {
      const response = await api.post('/products/bulk-restore', { ids })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Upload product image
  async uploadImage(file) {
    try {
      const formData = new FormData()
      formData.append('image', file)
      
      const response = await api.post('/products/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get product categories
  async getCategories() {
    try {
      const response = await api.get('/products/categories')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get product statistics
  async getProductStats() {
    try {
      const response = await api.get('/products/stats')
      return response.data
    } catch (error) {
      throw error
    }
  }
}

// Dashboard Service
export const dashboardService = {
  // Get dashboard statistics
  async getDashboardStats() {
    try {
      const response = await api.get('/dashboard/stats')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get recent activities
  async getRecentActivities() {
    try {
      const response = await api.get('/dashboard/activities')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get sales analytics
  async getSalesAnalytics(period = 'month') {
    try {
      const response = await api.get(`/dashboard/sales?period=${period}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default api 