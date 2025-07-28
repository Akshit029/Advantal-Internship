import { Link } from 'react-router-dom'
import { Home as HomeIcon, Users, Briefcase, Mail, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary-600">Advantal Internship</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-primary-600">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary-600">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600">Contact</Link>
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-primary-600" />
                    <span className="text-gray-700">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary-600">Login</Link>
                  <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {isAuthenticated ? `Welcome back, ${user?.name}!` : 'Welcome to Advantal Internship'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              {isAuthenticated ? 'You are successfully logged in to your account' : 'A MERN Stack Development Experience'}
            </p>
            <div className="flex justify-center space-x-4">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                    Get Started
                  </Link>
                  <Link to="/about" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600">
                    Learn More
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Features</h2>
            <p className="text-lg text-gray-600">Built with modern technologies</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <HomeIcon className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">React Frontend</h3>
              <p className="text-gray-600">Modern React with Vite and Tailwind CSS</p>
            </div>
            
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <Briefcase className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Node.js Backend</h3>
              <p className="text-gray-600">Express server with MongoDB integration</p>
            </div>
            
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Full Stack</h3>
              <p className="text-gray-600">Complete MERN stack application</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 