import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  CheckCircle, Clock, XCircle, Calendar, 
  User, Phone, Users, ChevronDown, MoreHorizontal 
} from 'lucide-react';
import { toast } from 'react-toastify';

function ManageReservation() {
  // Reservation status options (matches backend enum)
  const statusOptions = ['pending', 'confirmed', 'seated', 'completed', 'cancelled'];
  
  // State variables
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    date: '',
    page: 1,
    limit: 10,
    sort: '-createdAt'
  });
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 1
  });

  // Fetch reservations from backend
  const fetchReservations = async () => {
    try {
      setLoading(true);
      const params = {
        status: filters.status || undefined,
        date: filters.date || undefined,
        page: filters.page,
        limit: filters.limit,
        sort: filters.sort
      };
      
      const response = await axios.get('http://localhost:5000/api/reservation/getall-reservations', { params });
      
      setReservations(response.data.reservations);
      setPagination({
        total: response.data.total,
        pages: response.data.pages
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching reservations');
    } finally {
      setLoading(false);
    }
  };

  // Update reservation status
  const updateReservationStatus = async (id, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/reservation/update-reservation/${id}`,
        { status: newStatus }
      );
      
      toast.success(`Reservation status updated to ${newStatus}`);
      // Update local state
      setReservations(prev => 
        prev.map(res => 
          res._id === id ? { ...res, resStatus: newStatus } : res
        )
        
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating status');
    }
  };

  // Fetch data on component mount and filter changes
  useEffect(() => {
    fetchReservations();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  // Get status display details
  const getStatusDetails = (status) => {
    switch(status) {
      case 'pending':
        return { 
          text: 'Pending',
          icon: <Clock size={16} className="mr-1" />, 
          color: 'bg-yellow-100 text-yellow-800' 
        };
      case 'confirmed':
        return { 
          text: 'Confirmed',
          icon: <CheckCircle size={16} className="mr-1" />, 
          color: 'bg-blue-100 text-blue-800' 
        };
      case 'seated':
        return { 
          text: 'Seated',
          icon: <User size={16} className="mr-1" />, 
          color: 'bg-purple-100 text-purple-800' 
        };
      case 'completed':
        return { 
          text: 'Completed',
          icon: <CheckCircle size={16} className="mr-1" />, 
          color: 'bg-green-100 text-green-800' 
        };
      case 'cancelled':
        return { 
          text: 'Cancelled',
          icon: <XCircle size={16} className="mr-1" />, 
          color: 'bg-red-100 text-red-800' 
        };
      default:
        return { 
          text: status,
          icon: null, 
          color: 'bg-gray-100 text-gray-800' 
        };
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen ml-64 font-Funnel_Display">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Reservations</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Filter */}
        <div>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {getStatusDetails(status).text}
              </option>
            ))}
          </select>
        </div>
        
        {/* Date Filter */}
        <div>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Items Per Page */}
        <div>
          <select
            value={filters.limit}
            onChange={(e) => handleFilterChange('limit', Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="text-center py-8">
          <p>Loading reservations...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Reservations Table */}
      {!loading && !error && (
        <>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guests</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requests</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation) => {
                  const statusDetails = getStatusDetails(reservation.resStatus);
                  return (
                    <tr key={reservation._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {reservation.fullName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{reservation.email}</div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <Phone className="h-3 w-3 mr-1" />
                          {reservation.phoneNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          {new Date(reservation.reservedDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {reservation.reservedTime}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-gray-500" />
                          {reservation.numberOfAdults + reservation.numberOfChildren}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {reservation.specialNote || 'None'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`${statusDetails.color} flex items-center px-3 py-1 rounded-full text-xs font-medium`}>
                          {statusDetails.icon}
                          {statusDetails.text}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <select
                            value={reservation.resStatus}
                            onChange={(e) => updateReservationStatus(reservation._id, e.target.value)}
                            className="text-xs border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            {statusOptions.map(status => (
                              <option key={status} value={status}>
                                {getStatusDetails(status).text}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {reservations.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No reservations found matching your criteria
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between items-center">
            <div>
              Showing {reservations.length} of {pagination.total} reservations
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page <= 1}
                className={`px-3 py-1 rounded ${
                  filters.page <= 1 
                    ? 'bg-gray-200 cursor-not-allowed' 
                    : 'bg-white border hover:bg-gray-100'
                }`}
              >
                Previous
              </button>
              
              {[...Array(pagination.pages).keys()].map(num => (
                <button
                  key={num}
                  onClick={() => handlePageChange(num + 1)}
                  className={`px-3 py-1 rounded ${
                    filters.page === num + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border hover:bg-gray-100'
                  }`}
                >
                  {num + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page >= pagination.pages}
                className={`px-3 py-1 rounded ${
                  filters.page >= pagination.pages
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-white border hover:bg-gray-100'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ManageReservation;