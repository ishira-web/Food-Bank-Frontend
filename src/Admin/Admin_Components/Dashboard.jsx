import React from 'react';
import { Plus, Edit, Trash, Search, ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

function Dashboard() {
  // Sample data for recent orders
  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', date: '2023-10-15', amount: '$120', status: 'Completed' },
    { id: '#ORD-002', customer: 'Jane Smith', date: '2023-10-14', amount: '$85', status: 'Processing' },
    { id: '#ORD-003', customer: 'Robert Johnson', date: '2023-10-14', amount: '$240', status: 'Completed' },
    { id: '#ORD-004', customer: 'Emily Davis', date: '2023-10-13', amount: '$65', status: 'Pending' },
    { id: '#ORD-005', customer: 'Michael Wilson', date: '2023-10-12', amount: '$175', status: 'Completed' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen ml-64 font-Funnel_Display">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[var(--Treasureana---Geocaching-App-11)]">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="flex items-center gap-2 bg-[var(--Treasureana---Geocaching-App-11)] text-[var(--Treasureana---Geocaching-App-10)] px-4 py-2 rounded-lg hover:bg-opacity-90 transition">
            <Plus size={16} />
            Add New
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[var(--Treasureana---Geocaching-App-11)] rounded-xl shadow p-5">
          <h2 className="text-[var(--Treasureana---Geocaching-App-10)] text-sm">Total Orders</h2>
          <p className="text-2xl text-[var(--Treasureana---Geocaching-App-10)] font-semibold mt-1">1,250</p>
          <p className="text-xs text-[var(--Treasureana---Geocaching-App-10)] mt-2">+12% from last month</p>
        </div>
        <div className="bg-[var(--Treasureana---Geocaching-App-11)] rounded-xl shadow p-5">
          <h2 className="text-[var(--Treasureana---Geocaching-App-10)] text-sm">Total Revenue</h2>
          <p className="text-2xl text-[var(--Treasureana---Geocaching-App-10)] font-semibold mt-1">$18,940</p>
          <p className="text-xs text-[var(--Treasureana---Geocaching-App-10)] mt-2">+8% from last month</p>
        </div>
        <div className="bg-[var(--Treasureana---Geocaching-App-11)] rounded-xl shadow p-5">
          <h2 className="text-[var(--Treasureana---Geocaching-App-10)] text-sm">Available Dishes</h2>
          <p className="text-2xl font-semibold mt-1 text-[var(--Treasureana---Geocaching-App-10)]">58</p>
          <p className="text-xs text-[var(--Treasureana---Geocaching-App-10)] mt-2">+5 new this week</p>
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
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
            <span className="font-medium">1,250</span> orders
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border rounded-md text-sm font-medium text-white bg-[var(--Treasureana---Geocaching-App-11)] hover:bg-opacity-90">
              1
            </button>
            <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              2
            </button>
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