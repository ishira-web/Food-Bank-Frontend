import React, { useState } from 'react';
import { CheckCircle, Clock, XCircle, Calendar, User, Phone, Users, Search, ChevronDown, MoreHorizontal } from 'lucide-react';

function ManageReservation() {
  // Reservation status options
  const statusOptions = ['Pending', 'Confirmed', 'Seated', 'Completed', 'Cancelled', 'No Show'];
  
  // Sample reservations data
  const [reservations, setReservations] = useState([
    {
      id: '#RES-1001',
      customer: 'John Doe',
      phone: '+1 (555) 123-4567',
      date: '2023-06-20',
      time: '19:00',
      guests: 4,
      specialRequests: 'Window seat preferred',
      status: 'Pending'
    },
    {
      id: '#RES-1002',
      customer: 'Jane Smith',
      phone: '+1 (555) 987-6543',
      date: '2023-06-20',
      time: '20:30',
      guests: 2,
      specialRequests: 'Anniversary celebration',
      status: 'Confirmed'
    },
    {
      id: '#RES-1003',
      customer: 'Robert Johnson',
      phone: '+1 (555) 456-7890',
      date: '2023-06-21',
      time: '18:00',
      guests: 6,
      specialRequests: 'High chair needed',
      status: 'Pending'
    },
    {
      id: '#RES-1004',
      customer: 'Emily Davis',
      phone: '+1 (555) 789-0123',
      date: '2023-06-21',
      time: '19:30',
      guests: 3,
      specialRequests: 'Vegetarian options',
      status: 'Seated'
    },
    {
      id: '#RES-1005',
      customer: 'Michael Wilson',
      phone: '+1 (555) 234-5678',
      date: '2023-06-21',
      time: '20:00',
      guests: 5,
      specialRequests: '',
      status: 'Completed'
    }
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  // Filter reservations
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         reservation.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || reservation.status === statusFilter;
    const matchesDate = dateFilter === 'All' || reservation.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Update reservation status
  const updateStatus = (reservationId, newStatus) => {
    setReservations(reservations.map(reservation => 
      reservation.id === reservationId ? { ...reservation, status: newStatus } : reservation
    ));
  };

  // Get status details
  const getStatusDetails = (status) => {
    switch(status) {
      case 'Pending':
        return { icon: <Clock size={16} className="mr-1" />, color: 'bg-yellow-100 text-yellow-800' };
      case 'Confirmed':
        return { icon: <CheckCircle size={16} className="mr-1" />, color: 'bg-blue-100 text-blue-800' };
      case 'Seated':
        return { icon: <User size={16} className="mr-1" />, color: 'bg-purple-100 text-purple-800' };
      case 'Completed':
        return { icon: <CheckCircle size={16} className="mr-1" />, color: 'bg-green-100 text-green-800' };
      case 'Cancelled':
        return { icon: <XCircle size={16} className="mr-1" />, color: 'bg-red-100 text-red-800' };
      case 'No Show':
        return { icon: <XCircle size={16} className="mr-1" />, color: 'bg-gray-100 text-gray-800' };
      default:
        return { icon: null, color: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen ml-64 font-Funnel_Display">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Reservations</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reservations..."
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
        
        {/* Date Filter */}
        <div>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Dates</option>
            {[...new Set(reservations.map(reservation => reservation.date))].map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reservation ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guests</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requests</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReservations.map((reservation) => {
              const statusDetails = getStatusDetails(reservation.status);
              return (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reservation.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{reservation.customer}</div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <Phone className="h-3 w-3 mr-1" />
                      {reservation.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                      {reservation.date}
                    </div>
                    <div className="text-sm text-gray-500">{reservation.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-500" />
                      {reservation.guests}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {reservation.specialRequests || 'None'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`${statusDetails.color} flex items-center px-3 py-1 rounded-full text-xs font-medium`}>
                      {statusDetails.icon}
                      {reservation.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <select
                        value={reservation.status}
                        onChange={(e) => updateStatus(reservation.id, e.target.value)}
                        className="text-xs border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredReservations.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No reservations found matching your criteria
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Reservations</h3>
          <p className="text-2xl font-bold mt-1">{reservations.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-bold mt-1 text-yellow-600">
            {reservations.filter(r => r.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Confirmed</h3>
          <p className="text-2xl font-bold mt-1 text-blue-600">
            {reservations.filter(r => r.status === 'Confirmed').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Today's Reservations</h3>
          <p className="text-2xl font-bold mt-1">
            {reservations.filter(r => r.date === new Date().toISOString().split('T')[0]).length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ManageReservation;