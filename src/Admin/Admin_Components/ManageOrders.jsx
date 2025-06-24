import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  CookingPot, 
  CheckCircle, 
  XCircle, 
  Bike, 
  MoreVertical,
  Loader,
  RefreshCw
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ManageOrders() {
  // Order status options (matching backend values)
  const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  
  // State for orders and loading
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenueToday: 0,
    avgPrepTime: 0
  });

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get('http://localhost:5000/api/order/all');
      setOrders(response.data.orders);
      
      // Calculate stats
      const totalOrders = response.data.orders.length;
      const revenueToday = response.data.orders.reduce(
        (sum, order) => sum + order.totalAmount, 
        0
      );
      
      setStats({
        totalOrders,
        revenueToday,
        avgPrepTime: 23 // Placeholder, replace with actual calculation
      });
      
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Save original status in case we need to revert
      const originalOrders = [...orders];
      
      // Optimistic UI update
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      ));
      
      await axios.put(
        `http://localhost:5000/api/order/update-status/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      toast.success('Order status updated successfully');
      fetchOrders(); 
    } catch (error) {
      console.error('Error updating order status:', error);
      
      // Revert optimistic update on error
      setOrders(originalOrders);
      
      let errorMessage = 'Failed to update order status';
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error.response.status === 403) {
          errorMessage = 'You do not have permission to update orders';
        } else if (error.response.status === 404) {
          errorMessage = 'Order not found';
        }
      }
      
      toast.error(errorMessage);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'All' || 
      order.orderStatus.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Get status details
  const getStatusDetails = (status) => {
    const statusMap = {
      pending: { 
        text: 'Pending', 
        icon: <Clock className="mr-1" size={16} />, 
        color: 'bg-yellow-100 text-yellow-800' 
      },
      processing: { 
        text: 'Preparing', 
        icon: <CookingPot className="mr-1" size={16} />, 
        color: 'bg-blue-100 text-blue-800' 
      },
      shipped: { 
        text: 'On the Way', 
        icon: <Bike className="mr-1" size={16} />, 
        color: 'bg-orange-100 text-orange-800' 
      },
      delivered: { 
        text: 'Delivered', 
        icon: <CheckCircle className="mr-1" size={16} />, 
        color: 'bg-green-100 text-green-800' 
      },
      cancelled: { 
        text: 'Cancelled', 
        icon: <XCircle className="mr-1" size={16} />, 
        color: 'bg-red-100 text-red-800' 
      }
    };

    return statusMap[status] || { 
      text: status, 
      icon: null, 
      color: 'bg-gray-100 text-gray-800' 
    };
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen ml-64 font-Funnel_Display flex items-center justify-center">
        <Loader className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen ml-64 font-Funnel_Display">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Food Order Management</h1>
        <button 
          onClick={fetchOrders}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          disabled={refreshing}
        >
          {refreshing ? (
            <Loader className="animate-spin mr-2" size={18} />
          ) : (
            <RefreshCw className="mr-2" size={18} />
          )}
          Refresh Orders
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <option value="pending">Pending</option>
            <option value="processing">Preparing</option>
            <option value="shipped">On the Way</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Date Filter */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const statusDetails = getStatusDetails(order.orderStatus);
                return (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.orderId}</div>
                      <div className="text-xs text-gray-500">
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-xs text-gray-500">{order.phone}</div>
                      <div className="text-xs text-gray-500 mt-1">{order.deliveryAddress}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 space-y-1">
                        {order.orderItems.map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{item.quantity}x {item.foodName}</span>
                            <span>Rs. {item.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Rs. {order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.paymentMethod === 'card' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {order.paymentMethod === 'card' ? 'Credit Card' : 'Cash'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`${statusDetails.color} flex items-center px-3 py-1 rounded-full text-xs font-medium`}>
                        {statusDetails.icon}
                        {statusDetails.text}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="text-xs border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>
                              {getStatusDetails(status).text}
                            </option>
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

        {filteredOrders.length === 0 && !loading && (
          <div className="p-8 text-center text-gray-500">
            No orders found matching your criteria
          </div>
        )}

        {loading && (
          <div className="p-8 text-center">
            <Loader className="animate-spin text-blue-500 mx-auto" size={32} />
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold mt-1">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold mt-1">
            Rs. {stats.revenueToday.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Avg. Preparation Time</h3>
          <p className="text-2xl font-bold mt-1">{stats.avgPrepTime} min</p>
        </div>
      </div>
    </div>
  );
}

export default ManageOrders;