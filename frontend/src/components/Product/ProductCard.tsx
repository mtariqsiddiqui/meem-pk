import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      await addToCart({
        productId: product.id,
        quantity: 1
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-600 font-medium">
              {product.category.name}
            </span>
            {product.featured && (
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded">
                Featured
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              
              <Button
                onClick={handleAddToCart}
                size="sm"
                className="px-3 py-2"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
          
          {product.stock < 10 && product.stock > 0 && (
            <p className="text-orange-600 text-sm mt-2">
              Only {product.stock} left in stock
            </p>
          )}
          
          {product.stock === 0 && (
            <p className="text-red-600 text-sm mt-2 font-medium">
              Out of stock
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};