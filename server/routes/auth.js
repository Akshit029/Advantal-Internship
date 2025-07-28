import express from 'express'
import { register, login, getProfile, logout, forgotPassword, resetPassword, verifyOTP } from '../controllers/authController.js'
import { protect } from '../middlewares/auth.js'

const router = express.Router()

// Public routes
router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post('/verify-otp', verifyOTP)

// Protected routes
router.get('/profile', protect, getProfile)
router.post('/logout', protect, logout)

export default router 