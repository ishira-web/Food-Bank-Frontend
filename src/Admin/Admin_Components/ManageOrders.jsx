import React, { useState } from 'react';
import { Search, Clock, CookingPot, CheckCircle, XCircle, Bike, MoreVertical } from 'lucide-react';

function ManageOrders() {
  // Order status options
  const statusOptions = ['Pending', 'Preparing', 'Ready for Delivery', 'On the Way', 'Delivered', 'Cancelled'];
  
  // Sample food orders data
  const [orders, setOrders] = useState([
    {
      id: '#FOOD-1001',
      customer: 'John Doe',
      phone: '+1 (555) 123-4567',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
        { name: 'Garlic Bread', quantity: 2, price: 4.50 }
      ],
      total: 21.99,
      status: 'Preparing',
      payment: 'Credit Card',
      address: '123 Main St, Apt 4B',
      orderTime: '2023-06-15 12:30',
      deliveryType: 'Delivery'
    },
    {
      id: '#FOOD-1002',
      customer: 'Jane Smith',
      phone: '+1 (555) 987-6543',
      items: [
        { name: 'Chicken Burger', quantity: 1, price: 8.99 },
        { name: 'French Fries', quantity: 1, price: 3.99 },
        { name: 'Soda', quantity: 2, price: 2.50 }
      ],
      total: 18.98,
      status: 'Pending',
      payment: 'Cash on Delivery',
      address: '456 Oak Ave',
      orderTime: '2023-06-15 12:45',
      deliveryType: 'Delivery'
    },
    {
      id: '#FOOD-1003',
      customer: 'Robert Johnson',
      phone: '+1 (555) 456-7890',
      items: [
        { name: 'Vegetable Pasta', quantity: 1, price: 10.99 },
        { name: 'Caesar Salad', quantity: 1, price: 7.99 }
      ],
      total: 18.98,
      status: 'Ready for Delivery',
      payment: 'Credit Card',
      address: '789 Pine Rd',
      orderTime: '2023-06-15 13:15',
      deliveryType: 'Pickup'
    },
    {
      id: '#FOOD-1004',
      customer: 'Emily Davis',
      phone: '+1 (555) 789-0123',
      items: [
        { name: 'Sushi Platter', quantity: 1, price: 15.99 },
        { name: 'Miso Soup', quantity: 1, price: 3.50 }
      ],
      total: 19.49,
      status: 'On the Way',
      payment: 'Mobile Payment',
      address: '321 Elm Blvd',
      orderTime: '2023-06-15 13:30',
      deliveryType: 'Delivery'
    },
    {
      id: '#FOOD-1005',
      customer: 'Michael Wilson',
      phone: '+1 (555) 234-5678',
      items: [
        { name: 'Steak Dinner', quantity: 1, price: 22.99 },
        { name: 'Red Wine', quantity: 1, price: 8.99 }
      ],
      total: 31.98,
      status: 'Delivered',
      payment: 'Credit Card',
      address: '654 Maple Ln',
      orderTime: '2023-06-15 11:45',
      deliveryType: 'Delivery'
    }
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deliveryFilter, setDeliveryFilter] = useState('All');

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesDelivery = deliveryFilter === 'All' || order.deliveryType === deliveryFilter;
    
    return matchesSearch && matchesStatus && matchesDelivery;
  });

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Get status details
  const getStatusDetails = (status) => {
    switch(status) {
      case 'Pending':
        return { icon: <Clock className="mr-1" size={16} />, color: 'bg-yellow-100 text-yellow-800' };
      case 'Preparing':
        return { icon: <CookingPot className="mr-1" size={16} />, color: 'bg-blue-100 text-blue-800' };
      case 'Ready for Delivery':
        return { icon: <CheckCircle className="mr-1" size={16} />, color: 'bg-purple-100 text-purple-800' };
      case 'On the Way':
        return { icon: <Bike className="mr-1" size={16} />, color: 'bg-orange-100 text-orange-800' };
      case 'Delivered':
        return { icon: <CheckCircle className="mr-1" size={16} />, color: 'bg-green-100 text-green-800' };
      case 'Cancelled':
        return { icon: <XCircle className="mr-1" size={16} />, color: 'bg-red-100 text-red-800' };
      default:
        return { icon: null, color: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen ml-64 font-Funnel_Display">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Food Order Management</h1>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Statuses</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        
        {/* Delivery Type Filter */}
        <div>
          <select
            value={deliveryFilter}
            onChange={(e) => setDeliveryFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Types</option>
            <option value="Delivery">Delivery</option>
            <option value="Pickup">Pickup</option>
          </select>
        </div>

        {/* Time Filter */}
        <div>
          <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const statusDetails = getStatusDetails(order.status);
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      <div className="text-xs text-gray-500">{order.orderTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      <div className="text-xs text-gray-500">{order.phone}</div>
                      {order.deliveryType === 'Delivery' && (
                        <div className="text-xs text-gray-500 mt-1">{order.address}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span>${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.deliveryType === 'Delivery' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {order.deliveryType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`${statusDetails.color} flex items-center px-3 py-1 rounded-full text-xs font-medium`}>
                        {statusDetails.icon}
                        {order.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="text-xs border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No food orders found matching your criteria
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Orders Today</h3>
          <p className="text-2xl font-bold mt-1">12</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Revenue Today</h3>
          <p className="text-2xl font-bold mt-1">$246.75</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Avg. Preparation Time</h3>
          <p className="text-2xl font-bold mt-1">23 min</p>
        </div>
      </div>
    </div>
  );
}

export default ManageOrders;