import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const Cart: React.FC = () => {
  const { items, updateCartItem, removeFromCart, getCartTotal, isLoading } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
        <p className="text-gray-600 mb-6">You need to be logged in to view your cart.</p>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateCartItem(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId: string) => {
    await removeFromCart(itemId);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                
                <div className="flex-1 min-w-0">
                  <Link 
                    to={`/products/${item.product.id}`}
                    className="text-lg font-medium text-gray-900 hover:text-blue-600"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.product.category.name}
                  </p>
                  
                  {(item.size || item.color) && (
                    <div className="flex space-x-4 mt-2 text-sm text-gray-600">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-medium text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {shipping > 0 && (
            <p className="text-sm text-gray-600 mt-4">
              Add ${(50 - subtotal).toFixed(2)} more for free shipping!
            </p>
          )}

          <Link to="/checkout" className="block mt-6">
            <Button className="w-full" size="lg">
              Proceed to Checkout
            </Button>
          </Link>

          <Link to="/products" className="block mt-4">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};