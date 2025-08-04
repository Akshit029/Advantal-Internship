import { useState, useEffect } from 'react'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  Grid, 
  List, 
  RefreshCw,
  Download,
  Upload,
  MoreVertical,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

const Dashboard = () => {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showDeleted, setShowDeleted] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])

  // Mock products data with soft delete
  const mockProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 129.99,
      category: "Electronics",
      stock: 45,
      status: "active",
      rating: 4.5,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      description: "High-quality wireless headphones with noise cancellation",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      deletedAt: null
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 249.99,
      category: "Electronics",
      stock: 23,
      status: "active",
      rating: 4.3,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      description: "Advanced fitness tracking with heart rate monitor",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
      deletedAt: null
    },
    {
      id: 3,
      name: "Premium Coffee Maker",
      price: 149.99,
      originalPrice: 199.99,
      category: "Home & Kitchen",
      stock: 12,
      status: "active",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
      description: "Professional coffee maker with programmable settings",
      createdAt: "2024-01-05",
      updatedAt: "2024-01-15",
      deletedAt: null
    },
    {
      id: 4,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      category: "Fashion",
      stock: 0,
      status: "out_of_stock",
      rating: 4.2,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      description: "Comfortable organic cotton t-shirt",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-19",
      deletedAt: null
    },
    {
      id: 5,
      name: "Wireless Gaming Mouse",
      price: 79.99,
      originalPrice: 99.99,
      category: "Electronics",
      stock: 8,
      status: "active",
      rating: 4.6,
      reviews: 94,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      description: "High-precision gaming mouse with RGB lighting",
      createdAt: "2024-01-08",
      updatedAt: "2024-01-16",
      deletedAt: null
    },
    {
      id: 6,
      name: "Yoga Mat Premium",
      price: 49.99,
      originalPrice: 69.99,
      category: "Sports",
      stock: 34,
      status: "active",
      rating: 4.4,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      description: "Non-slip yoga mat with carrying strap",
      createdAt: "2024-01-03",
      updatedAt: "2024-01-14",
      deletedAt: "2024-01-25" // Soft deleted
    }
  ]

  const categories = ["all", "Electronics", "Fashion", "Home & Kitchen", "Sports", "Books", "Beauty"]
  const statuses = ["all", "active", "inactive", "out_of_stock"]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts)
      setFilteredProducts(mockProducts.filter(p => !p.deletedAt))
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    filterProducts()
  }, [searchTerm, selectedCategory, selectedStatus, showDeleted, products])

  const filterProducts = () => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(product => product.status === selectedStatus)
    }

    // Filter by deleted status
    if (!showDeleted) {
      filtered = filtered.filter(product => !product.deletedAt)
    }

    setFilteredProducts(filtered)
  }

  const handleSoftDelete = (productId) => {
    setProducts(products.map(product =>
      product.id === productId
        ? { ...product, deletedAt: new Date().toISOString().split('T')[0] }
        : product
    ))
  }

  const handleRestore = (productId) => {
    setProducts(products.map(product =>
      product.id === productId
        ? { ...product, deletedAt: null }
        : product
    ))
  }

  const handlePermanentDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId))
  }

  const handleBulkAction = (action) => {
    if (action === 'delete' && selectedProducts.length > 0) {
      setProducts(products.map(product =>
        selectedProducts.includes(product.id)
          ? { ...product, deletedAt: new Date().toISOString().split('T')[0] }
          : product
      ))
      setSelectedProducts([])
    }
  }

  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      inactive: { color: 'bg-gray-100 text-gray-800', text: 'Inactive' },
      out_of_stock: { color: 'bg-red-100 text-red-800', text: 'Out of Stock' }
    }
    const config = statusConfig[status] || statusConfig.inactive
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    )
  }

  const getStockBadge = (stock) => {
    if (stock === 0) return <span className="text-red-600 font-medium">Out of Stock</span>
    if (stock < 10) return <span className="text-orange-600 font-medium">Low Stock</span>
    return <span className="text-green-600 font-medium">In Stock</span>
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-6 w-6 animate-spin text-primary-600" />
            <span className="text-gray-600">Loading dashboard...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Product Dashboard</h1>
                <p className="text-gray-600">Manage your products and inventory</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="btn-secondary flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Import</span>
                </button>
                <button className="btn-secondary flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button className="btn-primary flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Products</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.status === 'active' && !p.deletedAt).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.status === 'out_of_stock' && !p.deletedAt).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <RefreshCw className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Deleted Products</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.deletedAt).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Grid className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-600" />
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>

                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.replace('_', ' ')}
                    </option>
                  ))}
                </select>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showDeleted}
                    onChange={(e) => setShowDeleted(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-600">Show Deleted</span>
                </label>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedProducts.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {selectedProducts.length} product(s) selected
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete Selected</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 ${
                product.deletedAt ? 'opacity-60' : ''
              } ${viewMode === 'list' ? 'flex' : ''}`}>
                <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={`object-cover ${viewMode === 'list' ? 'w-full h-48' : 'w-full h-48'}`}
                  />
                  {product.deletedAt && (
                    <div className="absolute inset-0 bg-red-500 bg-opacity-20 flex items-center justify-center">
                      <span className="text-red-600 font-semibold">Deleted</span>
                    </div>
                  )}
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    className="absolute top-2 left-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <div className="relative">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      {getStockBadge(product.stock)}
                      {getStatusBadge(product.status)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Stock: {product.stock} units
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {product.deletedAt ? (
                        <button
                          onClick={() => handleRestore(product.id)}
                          className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm"
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span>Restore</span>
                        </button>
                      ) : (
                        <>
                          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm">
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleSoftDelete(product.id)}
                            className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </>
                      )}
                    </div>
                    {product.deletedAt && (
                      <button
                        onClick={() => handlePermanentDelete(product.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Permanent Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Grid className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard 