import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { toast } from 'react-hot-toast'

const AddToCartButton = ({ product, className = '', disabled = false, showIcon = true }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart()

  const handleAddToCart = () => {
    if (disabled) return
    
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  const isInCartItem = isInCart(product.id)
  const quantity = getItemQuantity(product.id)

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled}
      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : isInCartItem
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'bg-primary-600 text-white hover:bg-primary-700'
      } ${className}`}
    >
      {showIcon && <ShoppingCart className="h-4 w-4" />}
      <span className="text-sm">
        {disabled 
          ? 'Sold Out' 
          : isInCartItem 
          ? `In Cart (${quantity})` 
          : 'Add to Cart'
        }
      </span>
    </button>
  )
}

export default AddToCartButton 