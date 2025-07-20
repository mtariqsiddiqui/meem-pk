import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../utils/api';
import { Button } from '../components/ui/Button';

export const Checkout: React.FC = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    phone: '',
    paymentMethod: 'credit_card'
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderData = {
        shippingAddress: formData,
        paymentMethod: formData.paymentMethod
      };

      const response = await api.post('/orders', orderData);
      await clearCart();
      navigate('/orders', { 
        state: { 
          message: 'Order placed successfully!', 
          orderId: response.order.id 
        } 
      });
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shipping Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
              </div>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={formData.paymentMethod === 'credit_card'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <span>Credit Card</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <span>PayPal</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="apple_pay"
                    checked={formData.paymentMethod === 'apple_pay'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <span>Apple Pay</span>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isProcessing}
              className="w-full"
              size="lg"
            >
              Place Order - ${total.toFixed(2)}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Order Items */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                      {item.size && ` • Size: ${item.size}`}
                      {item.color && ` • Color: ${item.color}`}
                    </p>
                  </div>
                  <span className="font-medium text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
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
          </div>

          {/* Shipping Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <Truck className="w-5 h-5 text-blue-600 mr-2" />
              <div>
                <p className="font-medium text-blue-900">Free shipping</p>
                <p className="text-sm text-blue-700">
                  {shipping === 0 
                    ? 'Your order qualifies for free shipping!' 
                    : `Add $${(50 - subtotal).toFixed(2)} more for free shipping`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};