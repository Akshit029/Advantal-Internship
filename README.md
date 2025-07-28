# Advantal Internship - Complete Authentication System

A full-stack MERN application featuring a comprehensive authentication system with modern UI/UX design.

## 🚀 Features

### Authentication System
- ✅ **User Registration** - Complete signup with validation
- ✅ **User Login** - Secure authentication with JWT
- ✅ **Forgot Password** - Email-based password reset with OTP
- ✅ **Password Reset** - Secure OTP verification and password update
- ✅ **User Dashboard** - Protected user profile and management
- ✅ **Session Management** - Persistent login with token storage

### Frontend Features
- ✅ **Modern React 18** - Latest React with hooks and context
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Form Validation** - Client-side validation with react-hook-form
- ✅ **Toast Notifications** - User feedback with react-hot-toast
- ✅ **Protected Routes** - Route guards for authenticated users
- ✅ **Loading States** - Smooth user experience with loading indicators

### Backend Features
- ✅ **Express.js Server** - RESTful API with proper middleware
- ✅ **MongoDB Integration** - Mongoose ODM with data validation
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Email Service** - Nodemailer integration for OTP delivery
- ✅ **Password Hashing** - Bcrypt for secure password storage
- ✅ **Rate Limiting** - API protection against abuse
- ✅ **Security Headers** - Helmet for enhanced security

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form management and validation
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens
- **Bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
advantal-internship/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/           # React context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/          # API services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
├── server/                     # Express Backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── OTP.js
│   ├── routes/
│   │   └── auth.js
│   ├── utils/
│   │   └── emailService.js
│   ├── server.js
│   └── package.json
├── SETUP.md                   # Detailed setup guide
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Gmail account for email service

### 1. Clone the Repository
```bash
git clone <repository-url>
cd advantal-internship
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create `.env` file:
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/advantal-internship
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_URL=http://localhost:3001
```

### 3. Frontend Setup
```bash
cd client
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5001/api
```

### 4. Start the Application
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

Visit: http://localhost:3001

## 📋 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/forgot-password` | Send OTP for password reset |
| POST | `/api/auth/verify-otp` | Verify OTP |
| POST | `/api/auth/reset-password` | Reset password with OTP |
| GET | `/api/auth/profile` | Get user profile (protected) |
| POST | `/api/auth/logout` | User logout (protected) |

## 🔐 Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Authentication** - Secure token-based sessions
- **Rate Limiting** - API protection against abuse
- **Input Validation** - Server-side validation
- **CORS Configuration** - Cross-origin security
- **Security Headers** - Helmet middleware
- **OTP Expiration** - 10-minute OTP validity
- **Token Management** - Automatic token cleanup

## 🎨 UI/UX Features

- **Responsive Design** - Works on all devices
- **Modern Interface** - Clean and intuitive design
- **Loading States** - Smooth user feedback
- **Form Validation** - Real-time validation
- **Toast Notifications** - User-friendly messages
- **Protected Routes** - Secure navigation
- **Step-by-step Process** - For password reset

## 📱 Pages

1. **Home** - Landing page with authentication status
2. **Login** - User authentication form
3. **Register** - New user registration
4. **Forgot Password** - 3-step password reset process
5. **Dashboard** - Protected user dashboard
6. **About/Contact** - Static information pages

## 🔧 Configuration

### Email Setup (Required for OTP)
1. Enable 2-factor authentication on Gmail
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use in `EMAIL_PASS` environment variable

### Environment Variables
See `SETUP.md` for detailed configuration instructions.

## 🚀 Deployment

### Backend Deployment
- Set `NODE_ENV=production`
- Use production MongoDB instance
- Configure production email service
- Set strong JWT secret
- Configure CORS origins

### Frontend Deployment
- Set `VITE_API_URL` to production API URL
- Build with `npm run build`
- Deploy to Vercel, Netlify, or similar

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the Advantal Internship program.

## 🆘 Support

For setup issues, see `SETUP.md` for detailed troubleshooting guide.

---

**Built with ❤️ for Advantal Internship** 