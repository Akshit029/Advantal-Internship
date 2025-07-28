import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGODB_URI is not set in environment variables')
    }
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`📦 MongoDB Connected Successfully`)
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    process.exit(1)
  }
}

export default connectDB 