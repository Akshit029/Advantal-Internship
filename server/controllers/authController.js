import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import OTP from '../models/OTP.js'
import { sendOTPEmail, generateOTP } from '../utils/emailService.js'

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  try {
    // In a real application, you might want to blacklist the token
    // For now, we'll just send a success response
    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Send forgot password OTP
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Generate OTP
    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Save OTP to database
    await OTP.create({
      email,
      otp,
      type: 'password-reset',
      expiresAt
    })

    // Send OTP email
    await sendOTPEmail(email, otp, 'password-reset')

    res.json({ message: 'OTP sent to your email' })
  } catch (error) {
    console.error('Forgot password error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Verify OTP and reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body

    // Find valid OTP
    const otpRecord = await OTP.findOne({
      email,
      otp,
      type: 'password-reset',
      isUsed: false,
      expiresAt: { $gt: new Date() }
    })

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update password
    user.password = newPassword
    await user.save()

    // Mark OTP as used
    otpRecord.isUsed = true
    await otpRecord.save()

    res.json({ message: 'Password reset successfully' })
  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp, type } = req.body

    // Find valid OTP
    const otpRecord = await OTP.findOne({
      email,
      otp,
      type,
      isUsed: false,
      expiresAt: { $gt: new Date() }
    })

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' })
    }

    res.json({ message: 'OTP verified successfully' })
  } catch (error) {
    console.error('Verify OTP error:', error)
    res.status(500).json({ message: 'Server error' })
  }
} 