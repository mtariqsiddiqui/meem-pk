import React, { useState, useEffect } from 'react';
import { DollarSign, Package, ShoppingBag, Users } from 'lucide-react';
import { api } from '../../utils/api';

interface Stats {
  totalRevenue: number;
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
}

export const AdminDashboardHome: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // In a real app, you'd have a dedicated stats endpoint
      const [products, orders, users] = await Promise.all([
        api.get('/products'),
        api.get('/orders/all'),
        api.get('/users')
      ]);

      const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.total, 0);

      setStats({
        totalRevenue,
        totalProducts: products.pagination?.total || products.length,
        totalOrders: orders.length,
        totalUsers: users.length
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Products',
      value: stats.totalProducts.toString(),
      icon: Package,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingBag,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Users',
      value: stats.totalUsers.toString(),
      icon: Users,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Add New Product</div>
              <div className="text-sm text-gray-600">Create a new product listing</div>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">View Recent Orders</div>
              <div className="text-sm text-gray-600">Check latest customer orders</div>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">User Management</div>
              <div className="text-sm text-gray-600">Manage user accounts and roles</div>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New order received (#12345)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Product "Wireless Headphones" updated</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New user registered</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Order #12344 shipped</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};