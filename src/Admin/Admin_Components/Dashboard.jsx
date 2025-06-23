import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Search, ArrowUpDown, ChevronDown, MoreHorizontal, Loader } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [foodCount, setFoodCount] = useState(0);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    foodCount: 0
  });

  // Fetch food count
  const fetchFoodCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/food/getNumber');
      setFoodCount(response.data.foodCount || response.data.count || 0);
    } catch (err) {
      toast.error('Failed to load food count');
    }
  };

  // Fetch all dashboard data
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch data in parallel
      const [ordersResponse, revenueResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/order/all'),
        axios.get('http://localhost:5000/api/order/revenue/total')
      ]);

      const allOrders = ordersResponse.data.orders;
      const revenueData = revenueResponse.data;
      
      // Set orders and stats
      setOrders(allOrders);
      setStats({
        totalOrders: allOrders.length,
        totalRevenue: revenueData.totalRevenue || 0,
        foodCount: foodCount
      });
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch food count first, then fetch other data
    const loadData = async () => {
      await fetchFoodCount();
      await fetchData();
    };
    
    loadData();
  }, []);

  // Get recent orders (last 5 orders)
  const recentOrders = orders
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status details
  const getStatusDetails = (status) => {
    const statusMap = {
      pending: { text: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
      processing: { text: 'Processing', color: 'bg-blue-100 text-blue-800' },
      shipped: { text: 'Shipped', color: 'bg-orange-100 text-orange-800' },
      delivered: { text: 'Delivered', color: 'bg-green-100 text-green-800' },
      cancelled: { text: 'Cancelled', color: 'bg-red-100 text-red-800' }
    };

    return statusMap[status] || { text: status, color: 'bg-gray-100 text-gray-800' };
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen ml-64 font-Funnel_Display flex items-center justify-center">
        <Loader className="animate-spin text-[var(--Treasureana---Geocaching-App-11)]" size={48} />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen ml-64 font-Funnel_Display">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[var(--Treasureana---Geocaching-App-11)]">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button 
            className="flex items-center gap-2 bg-[var(--Treasureana---Geocaching-App-11)] text-[var(--Treasureana---Geocaching-App-10)] px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
            onClick={async () => {
              await fetchFoodCount();
              await fetchData();
            }}
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[var(--Treasureana---Geocaching-App-11)] rounded-xl shadow p-5">
          <h2 className="text-[var(--Treasureana---Geocaching-App-10)] text-sm">Total Orders</h2>
          <p className="text-2xl text-[var(--Treasureana---Geocaching-App-10)] font-semibold mt-1">
            {stats.totalOrders}
          </p>
          <p className="text-xs text-[var(--Treasureana---Geocaching-App-10)] mt-2">
            {orders.length > 0 ? 'Latest order: ' + formatDate(orders[0].createdAt) : 'No orders yet'}
          </p>
        </div>
        <div className="bg-[var(--Treasureana---Geocaching-App-11)] rounded-xl shadow p-5">
          <h2 className="text-[var(--Treasureana---Geocaching-App-10)] text-sm">Total Revenue</h2>
          <p className="text-2xl text-[var(--Treasureana---Geocaching-App-10)] font-semibold mt-1">
            Rs. {stats.totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-[var(--Treasureana---Geocaching-App-10)] mt-2">
            {orders.length > 0 ? 'Average order: Rs. ' + Math.round(stats.totalRevenue / stats.totalOrders).toLocaleString() : ''}
          </p>
        </div>
        <div className="bg-[var(--Treasureana---Geocaching-App-11)] rounded-xl shadow p-5">
          <h2 className="text-[var(--Treasureana---Geocaching-App-10)] text-sm">Available Dishes</h2>
          <p className="text-2xl font-semibold mt-1 text-[var(--Treasureana---Geocaching-App-10)]">
            {foodCount}
          </p>
          <p className="text-xs text-[var(--Treasureana---Geocaching-App-10)] mt-2">
            {foodCount > 0 ? 'Fresh dishes available' : 'No dishes available'}
          </p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-11)]"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer">
                    Order ID
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.length > 0 ? recentOrders.map((order) => {
                const statusDetails = getStatusDetails(order.orderStatus);
                return (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rs. {order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusDetails.color}`}>
                        {statusDetails.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Trash className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(5, orders.length)}</span> of{' '}
            <span className="font-medium">{orders.length}</span> orders
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border rounded-md text-sm font-medium text-white bg-[var(--Treasureana---Geocaching-App-11)] hover:bg-opacity-90">
              1
            </button>
            {orders.length > 5 && (
              <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                2
              </button>
            )}
            <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;