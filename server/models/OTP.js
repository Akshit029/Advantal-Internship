import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    required: true,
    length: 6
  },
  type: {
    type: String,
    enum: ['password-reset', 'email-verification'],
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  isUsed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Index for automatic cleanup of expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const OTP = mongoose.model('OTP', otpSchema)

export default OTP 