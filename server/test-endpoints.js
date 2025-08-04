import axios from 'axios'

const BASE_URL = 'https://advantal-internship.onrender.com/api'

const testEndpoints = async () => {
  console.log('🔍 Testing Backend Endpoints...\n')

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...')
    const healthResponse = await axios.get(`${BASE_URL}/health`)
    console.log('✅ Health Check:', healthResponse.data)
    console.log('')

    // Test 2: Auth Routes
    console.log('2. Testing Auth Routes...')
    
    // Test register endpoint
    try {
      const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })
      console.log('✅ Register endpoint working')
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message === 'User already exists') {
        console.log('✅ Register endpoint working (user already exists)')
      } else {
        console.log('❌ Register endpoint error:', error.response?.data || error.message)
      }
    }

    // Test login endpoint
    try {
      const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
        email: 'test@example.com',
        password: 'password123'
      })
      console.log('✅ Login endpoint working')
    } catch (error) {
      console.log('❌ Login endpoint error:', error.response?.data || error.message)
    }

    console.log('\n🎯 Backend Test Complete!')
    
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message)
    console.log('\nPossible issues:')
    console.log('1. Backend not deployed properly')
    console.log('2. MongoDB connection failed')
    console.log('3. Environment variables not set')
    console.log('4. Service is sleeping (cold start)')
  }
}

testEndpoints() 