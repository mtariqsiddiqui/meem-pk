import React, { useState } from 'react';
import { User, Settings, CreditCard, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

export const Account: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
              
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.firstName}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.lastName}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <Button type="submit">Save Changes</Button>
              </form>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
                <Button variant="outline">Add New Address</Button>
              </div>
              
              <div className="text-center py-12 text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No saved addresses yet.</p>
                <p className="text-sm">Add an address to make checkout faster.</p>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
                <Button variant="outline">Add Payment Method</Button>
              </div>
              
              <div className="text-center py-12 text-gray-500">
                <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No payment methods saved.</p>
                <p className="text-sm">Add a payment method for faster checkout.</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span>Email notifications for order updates</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span>Marketing emails and promotions</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span>SMS notifications</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span>Make my profile public</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span>Save my browsing history</span>
                    </label>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                  <Button variant="danger">Delete Account</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};