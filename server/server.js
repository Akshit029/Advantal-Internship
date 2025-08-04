import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import connectDB from './config/db.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Connect to MongoDB
connectDB()

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
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Advantal Internship API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// Import routes
import authRoutes from './routes/auth.js'

// API routes
app.use('/api/auth', authRoutes)
// app.use('/api/users', userRoutes)
// app.use('/api/posts', postRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`)
  console.log(`🔗 Auth routes: /api/auth/login, /api/auth/register`)
  console.log(`🔗 MongoDB connected Successfully`)
  
  // Debug: List all registered routes
  console.log('🔍 Debug: Registered routes:')
  app._router.stack.forEach(middleware => {
    if (middleware.route) {
      console.log(`   ${Object.keys(middleware.route.methods).join(',').toUpperCase()} ${middleware.route.path}`)
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach(handler => {
        if (handler.route) {
          console.log(`   ${Object.keys(handler.route.methods).join(',').toUpperCase()} ${handler.route.path}`)
        }
      })
    }
  })
}) 