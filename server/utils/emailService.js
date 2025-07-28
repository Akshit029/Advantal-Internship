import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// Check if EMAIL_USER and EMAIL_PASS are set in environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('EMAIL_USER and EMAIL_PASS must be set in environment variables')
}

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Send OTP email
export const sendOTPEmail = async (email, otp, type) => {
  try {
    const subject = type === 'password-reset' 
      ? 'Password Reset OTP' 
      : 'Email Verification OTP'
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Advantal Internship</h1>
        </div>
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">${subject}</h2>
          <p style="color: #666; margin-bottom: 20px;">
            Your OTP for ${type === 'password-reset' ? 'password reset' : 'email verification'} is:
          </p>
          <div style="background: #fff; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #667eea; font-size: 32px; letter-spacing: 8px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #666; font-size: 14px;">
            This OTP will expire in 10 minutes. If you didn't request this, please ignore this email.
          </p>
        </div>
        <div style="background: #333; padding: 20px; text-align: center;">
          <p style="color: #fff; margin: 0; font-size: 14px;">
            © 2024 Advantal Internship. All rights reserved.
          </p>
        </div>
      </div>
    `

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: html
    }

    const result = await transporter.sendMail(mailOptions)
    return result
  } catch (error) {
    console.error('Email sending error:', error)
    throw new Error('Failed to send email')
  }
}

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
} 