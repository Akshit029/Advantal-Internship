# Advantal Internship - Authentication System Setup

This project includes a complete authentication system with login, signup, and forgot password functionality with OTP verification.

## Features

- ✅ User Registration with validation
- ✅ User Login with JWT authentication
- ✅ Forgot Password with OTP via email
- ✅ Password Reset with OTP verification
- ✅ Modern React frontend with Tailwind CSS
- ✅ Express.js backend with MongoDB
- ✅ Email service integration
- ✅ Form validation with react-hook-form
- ✅ Toast notifications
- ✅ Responsive design

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Gmail account for email service

## Setup Instructions

### 1. Backend Setup

Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the server directory with the following variables:
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/advantal-internship

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Client URL
CLIENT_URL=http://localhost:3001
```

**Important Email Setup:**
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in EMAIL_PASS

### 2. Frontend Setup

Navigate to the client directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5001/api
```

### 3. Running the Application

**Start the backend server:**
```bash
cd server
npm run dev
```

**Start the frontend development server:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3001
- Backend API: http://localhost:5001

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Send OTP for password reset
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/reset-password` - Reset password with OTP
- `GET /api/auth/profile` - Get user profile (protected)
- `POST /api/auth/logout` - User logout (protected)

## Usage

1. **Registration**: Visit `/register` to create a new account
2. **Login**: Visit `/login` to sign in
3. **Forgot Password**: Click "Forgot your password?" on login page
4. **Password Reset**: Follow the 3-step process:
   - Enter email
   - Verify OTP sent to email
   - Set new password

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── components/    # Reusable components
│   └── package.json
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middlewares/      # Custom middlewares
│   ├── utils/            # Utility functions
│   └── package.json
└── README.md
```

## Technologies Used

### Frontend
- React 18
- React Router DOM
- React Hook Form
- Axios
- Tailwind CSS
- Lucide React (Icons)
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Nodemailer
- Bcryptjs
- Express Validator

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- Input validation
- CORS configuration
- Helmet security headers
- OTP expiration (10 minutes)

## Troubleshooting

1. **Email not sending**: Check your Gmail app password and 2FA settings
2. **MongoDB connection error**: Ensure MongoDB is running and connection string is correct
3. **CORS errors**: Verify CLIENT_URL in server .env file
4. **JWT errors**: Check JWT_SECRET is set in server .env file

## Production Deployment

For production deployment:
1. Change NODE_ENV to "production"
2. Use a strong JWT_SECRET
3. Set up a production MongoDB instance
4. Configure a production email service
5. Set up proper CORS origins
6. Use environment variables for all sensitive data 