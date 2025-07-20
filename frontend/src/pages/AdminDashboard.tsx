import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  BarChart3,
  Settings,
  Plus
} from 'lucide-react';
import { AdminProducts } from '../components/Admin/AdminProducts';
import { AdminOrders } from '../components/Admin/AdminOrders';
import { AdminUsers } from '../components/Admin/AdminUsers';
import { AdminDashboardHome } from '../components/Admin/AdminDashboardHome';

export const AdminDashboard: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r border-gray-200">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            
            <div className="mt-8 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href || 
                    (item.href !== '/admin' && location.pathname.startsWith(item.href));
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<AdminDashboardHome />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/analytics" element={
              <div className="p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p>Analytics dashboard coming soon...</p>
                </div>
              </div>
            } />
            <Route path="/settings" element={
              <div className="p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p>Settings panel coming soon...</p>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
};