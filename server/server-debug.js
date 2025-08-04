import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

console.log('🔍 Debug: Starting server...')

// Security middleware
app.use(helmet())
app.use(compression())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use('/api/', limiter)

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Logging middleware
app.use(morgan('dev'))

// Test route
app.get('/api/health', (req, res) => {
  console.log('🔍 Debug: Health check endpoint hit')
  res.json({ 
    message: 'Advantal Internship API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// Test auth route without import
app.post('/api/auth/login', (req, res) => {
  console.log('🔍 Debug: Login endpoint hit', req.body)
  res.json({ 
    message: 'Login endpoint working (debug mode)',
    body: req.body
  })
})

app.post('/api/auth/register', (req, res) => {
  console.log('🔍 Debug: Register endpoint hit', req.body)
  res.json({ 
    message: 'Register endpoint working (debug mode)',
    body: req.body
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🔍 Debug: Error middleware:', err.stack)
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  })
})

// 404 handler
app.use('*', (req, res) => {
  console.log('🔍 Debug: 404 handler hit for:', req.originalUrl)
  res.status(404).json({ message: 'Route not found' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Debug Server running on port ${PORT}`)
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`)
  console.log(`🔗 Test login: POST http://localhost:${PORT}/api/auth/login`)
}) 