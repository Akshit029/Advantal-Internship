import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
// import About from './pages/About'
// import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Cart from './pages/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            {/* Ecommerce Routes */}
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/categories/:category" element={<div className="pt-16 text-center py-20"><h1 className="text-3xl font-bold">Category Page - Coming Soon</h1></div>} />
            <Route path="/deals" element={<div className="pt-16 text-center py-20"><h1 className="text-3xl font-bold">Deals Page - Coming Soon</h1></div>} />
            <Route path="/wishlist" element={<div className="pt-16 text-center py-20"><h1 className="text-3xl font-bold">Wishlist - Coming Soon</h1></div>} />
            <Route path="/profile" element={<div className="pt-16 text-center py-20"><h1 className="text-3xl font-bold">Profile Page - Coming Soon</h1></div>} />
            <Route path="/orders" element={<div className="pt-16 text-center py-20"><h1 className="text-3xl font-bold">Orders Page - Coming Soon</h1></div>} /> */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App 