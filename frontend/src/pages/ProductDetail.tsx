import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { Product } from '../types';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/Button';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        const productData = await productService.getProduct(id);
        setProduct(productData);
        
        // Set default selections
        if (productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }
        if (productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }
      } catch (error) {
        console.error('Failed to load product:', error);
        navigate('/products');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!product) return;

    try {
      setIsAddingToCart(true);
      await addToCart({
        productId: product.id,
        quantity,
        size: selectedSize || undefined,
        color: selectedColor || undefined
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <Button onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover object-center"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <nav className="text-sm text-gray-500 mb-2">
              <span>{product.category.name}</span>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            {product.featured && (
              <span className="inline-block bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full mt-2">
                Featured Product
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
              <span className="ml-2 text-gray-600">(4.5)</span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 text-sm font-medium rounded-md border ${
                      selectedSize === size
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`py-2 px-4 text-sm font-medium rounded-md border ${
                      selectedColor === color
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="text-xl font-medium w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          {/* Stock Status */}
          <div className="text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">
                {product.stock} in stock
              </span>
            ) : (
              <span className="text-red-600 font-medium">Out of stock</span>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Button
              onClick={handleAddToCart}
              isLoading={isAddingToCart}
              disabled={product.stock === 0}
              className="w-full"
              size="lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>

            <div className="flex space-x-4">
              <button className="flex items-center justify-center flex-1 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
              </button>
              <button className="flex items-center justify-center flex-1 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
            <dl className="space-y-2">
              <div className="flex">
                <dt className="text-sm font-medium text-gray-500 w-1/3">Category:</dt>
                <dd className="text-sm text-gray-900">{product.category.name}</dd>
              </div>
              <div className="flex">
                <dt className="text-sm font-medium text-gray-500 w-1/3">Stock:</dt>
                <dd className="text-sm text-gray-900">{product.stock} available</dd>
              </div>
              {product.sizes.length > 0 && (
                <div className="flex">
                  <dt className="text-sm font-medium text-gray-500 w-1/3">Sizes:</dt>
                  <dd className="text-sm text-gray-900">{product.sizes.join(', ')}</dd>
                </div>
              )}
              {product.colors.length > 0 && (
                <div className="flex">
                  <dt className="text-sm font-medium text-gray-500 w-1/3">Colors:</dt>
                  <dd className="text-sm text-gray-900">{product.colors.join(', ')}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};