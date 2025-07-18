import { Plus, ShoppingBag, Edit, Check, X, Search, Calendar, Package, CreditCard, Truck, CheckCircle, XCircle, ChevronRight, Receipt } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [tempProfile, setTempProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [profileResponse, ordersResponse] = await Promise.all([
        axios.get('https://food-bank-backend-gqeu.onrender.com/api/account/me', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('https://food-bank-backend-gqeu.onrender.com/api/order/my-orders', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const userData = profileResponse.data.data;
      setProfile(userData);
      setTempProfile({ ...userData });
      
      if (ordersResponse.data.success) {
        setOrders(ordersResponse.data.orders);
      }
      
      setLoading(false);
      setOrdersLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = profile._id;

      // Create FormData
      const formData = new FormData();
      formData.append('firstName', tempProfile.firstName);
      formData.append('lastName', tempProfile.lastName);
      formData.append('email', tempProfile.email);
      formData.append('phoneNumber', tempProfile.phoneNumber);
      formData.append('gender', tempProfile.gender);
      
      // Append file if exists
      if (tempProfile.profilePictureFile) {
        formData.append('profilePicture', tempProfile.profilePictureFile);
      }

      const response = await axios.put(
        `https://food-bank-backend-gqeu.onrender.com/api/account/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Update profile and clean up - FIXED HERE
      setProfile(response.data.user);
      
      setIsEditing(false);
      
      if (profilePicturePreview) {
        URL.revokeObjectURL(profilePicturePreview);
        setProfilePicturePreview(null);
      }
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      
      if (profilePicturePreview) {
        URL.revokeObjectURL(profilePicturePreview);
        setProfilePicturePreview(null);
      }
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to update profile. Please try again.';
      
      toast.error(errorMessage);
    }
  };

  const handleCancelClick = () => {
    // Clean up preview URL
    if (profilePicturePreview) {
      URL.revokeObjectURL(profilePicturePreview);
      setProfilePicturePreview(null);
    }
    
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setTempProfile({
      ...tempProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setProfilePicturePreview(previewUrl);
      
      setTempProfile({
        ...tempProfile,
        profilePictureFile: file
      });
    }
  };

  const getStatusDetails = (status) => {
    const statusMap = {
      pending: { 
        text: 'Pending', 
        color: 'bg-yellow-100 text-yellow-800',
        icon: <Truck className="mr-1" size={16} />
      },
      processing: { 
        text: 'Preparing', 
        color: 'bg-blue-100 text-blue-800',
        icon: <Truck className="mr-1" size={16} />
      },
      shipped: { 
        text: 'On the Way', 
        color: 'bg-orange-100 text-orange-800',
        icon: <Truck className="mr-1" size={16} />
      },
      delivered: { 
        text: 'Delivered', 
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="mr-1" size={16} />
      },
      cancelled: { 
        text: 'Cancelled', 
        color: 'bg-red-100 text-red-800',
        icon: <XCircle className="mr-1" size={16} />
      }
    };

    return statusMap[status] || { 
      text: status, 
      color: 'bg-gray-100 text-gray-800',
      icon: <Truck className="mr-1" size={16} />
    };
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => {
    return order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
           order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           order.orderItems.some(item => 
             item.foodName.toLowerCase().includes(searchTerm.toLowerCase())
           );
  });

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen bg-[var(--Treasureana---Geocaching-App-11)]'>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className='flex flex-col md:flex-row w-full'>
        {/* Profile Section */}
        <div className='w-full md:w-1/2 min-h-screen p-8'>
          <div className='flex flex-col items-center justify-center max-w-md mx-auto'>
            <h2 className='text-3xl font-bold mb-2 text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display'>
              My Profile
            </h2>
            <p className='text-[var(--Treasureana---Geocaching-App-9)] font-Funnel_Display mb-8'>
              {isEditing ? 'Edit your account details' : 'Manage your account details'}
            </p>

            {/* Profile Picture */}
            <div className='relative mb-6'>
              {isEditing && profilePicturePreview ? (
                <img 
                  src={profilePicturePreview} 
                  alt="Preview" 
                  className='w-32 h-32 rounded-full object-cover'
                />
              ) : profile.profilePicture ? (
                <img 
                  src={profile.profilePicture} 
                  alt="Profile" 
                  className='w-32 h-32 rounded-full object-cover'
                />
              ) : (
                <div className='w-32 h-32 rounded-full bg-[var(--Treasureana---Geocaching-App-8)] flex items-center justify-center overflow-hidden'>
                  <span className='text-white text-4xl font-bold'>
                    {profile.firstName[0]}{profile.lastName[0]}
                  </span>
                </div>
              )}
              
              {isEditing && (
                <label className='absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer'>
                  <Plus className='w-5 h-5' />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            {/* Profile Fields */}
            <div className='w-full space-y-6'>
              {/* First Name */}
              <div className='space-y-1'>
                <label className='block text-sm font-medium text-[var(--Treasureana---Geocaching-App-9)]'>First Name</label>
                {isEditing ? (
                  <input
                    name='firstName'
                    type='text'
                    value={tempProfile.firstName}
                    onChange={handleChange}
                    className='w-full px-4 py-2 rounded-md border border-[var(--Treasureana---Geocaching-App-10)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-8)]'
                  />
                ) : (
                  <div className='w-full px-4 py-2 rounded-md bg-gray-50'>
                    {profile.firstName}
                  </div>
                )}
              </div>

              {/* Last Name */}
              <div className='space-y-1'>
                <label className='block text-sm font-medium text-[var(--Treasureana---Geocaching-App-9)]'>Last Name</label>
                {isEditing ? (
                  <input
                    name='lastName'
                    type='text'
                    value={tempProfile.lastName}
                    onChange={handleChange}
                    className='w-full px-4 py-2 rounded-md border border-[var(--Treasureana---Geocaching-App-10)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-8)]'
                  />
                ) : (
                  <div className='w-full px-4 py-2 rounded-md bg-gray-50'>
                    {profile.lastName}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className='space-y-1'>
                <label className='block text-sm font-medium text-[var(--Treasureana---Geocaching-App-9)]'>Email</label>
                {isEditing ? (
                  <input
                    name='email'
                    type='email'
                    value={tempProfile.email}
                    onChange={handleChange}
                    className='w-full px-4 py-2 rounded-md border border-[var(--Treasureana---Geocaching-App-10)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-8)]'
                  />
                ) : (
                  <div className='w-full px-4 py-2 rounded-md bg-gray-50'>
                    {profile.email}
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div className='space-y-1'>
                <label className='block text-sm font-medium text-[var(--Treasureana---Geocaching-App-9)]'>Phone</label>
                {isEditing ? (
                  <input
                    name='phoneNumber'
                    type='tel'
                    value={tempProfile.phoneNumber}
                    onChange={handleChange}
                    className='w-full px-4 py-2 rounded-md border border-[var(--Treasureana---Geocaching-App-10)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-8)]'
                  />
                ) : (
                  <div className='w-full px-4 py-2 rounded-md bg-gray-50'>
                    {profile.phoneNumber}
                  </div>
                )}
              </div>

              {/* Gender */}
              <div className='space-y-1'>
                <label className='block text-sm font-medium text-[var(--Treasureana---Geocaching-App-9)]'>Gender</label>
                {isEditing ? (
                  <select
                    name='gender'
                    value={tempProfile.gender || ''}
                    onChange={handleChange}
                    className='w-full px-4 py-2 rounded-md border border-[var(--Treasureana---Geocaching-App-10)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-8)]'
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                ) : (
                  <div className='w-full px-4 py-2 rounded-md bg-gray-50 min-h-[42px]'>
                    {profile.gender ? 
                      profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : 
                      'Not specified'}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className='pt-4 flex gap-2'>
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveClick}
                      className='flex-1 px-6 py-3 bg-[var(--Treasureana---Geocaching-App-8)] text-[var(--Treasureana---Geocaching-App-11)] rounded-md hover:bg-[var(--Treasureana---Geocaching-App-9)] transition-colors font-medium flex items-center justify-center gap-2'
                    >
                      <Check size={20} />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className='flex-1 px-6 py-3 border border-[var(--Treasureana---Geocaching-App-10)] hover:text-[var(--Treasureana---Geocaching-App-11)] text-[var(--Treasureana---Geocaching-App-9)] rounded-md hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2'
                    >
                      <X size={20} />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEditClick}
                    className='w-full px-6 py-3 bg-[var(--Treasureana---Geocaching-App-8)] text-[var(--Treasureana---Geocaching-App-11)] rounded-md hover:bg-[var(--Treasureana---Geocaching-App-9)] transition-colors font-medium flex items-center justify-center gap-2'
                  >
                    <Edit size={20} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Order History Section */}
        <div className='w-full md:w-1/2 min-h-screen bg-[var(--Treasureana---Geocaching-App-7)] p-8'>
          <div className='max-w-md mx-auto'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-3xl font-bold text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display'>
                My Orders
              </h2>
            </div>
            
            {ordersLoading ? (
              <div className="text-center py-12">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--Treasureana---Geocaching-App-8)]"></div>
                </div>
                <p className='mt-4 text-[var(--Treasureana---Geocaching-App-9)]'>Loading your orders...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className='text-center py-12 bg-white rounded-xl p-6 shadow-sm'>
                <ShoppingBag className='w-16 h-16 mx-auto text-[var(--Treasureana---Geocaching-App-10)]' />
                <h3 className='text-xl font-semibold mt-4 text-gray-800'>
                  {orders.length === 0 ? 'No orders yet' : 'No matching orders'}
                </h3>
                <p className='mt-2 text-[var(--Treasureana---Geocaching-App-9)]'>
                  {orders.length === 0 
                    ? 'Start shopping to see your orders here' 
                    : 'Try adjusting your search query'}
                </p>
                <button 
                  className='mt-6 px-6 py-3 bg-[var(--Treasureana---Geocaching-App-8)] text-white rounded-md hover:bg-[var(--Treasureana---Geocaching-App-9)] transition-colors font-medium flex items-center justify-center gap-2 mx-auto'
                  onClick={() => window.location.href = '/'}
                >
                  {orders.length === 0 ? 'Start Shopping' : 'Browse Menu'}
                </button>
              </div>
            ) : (
              <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
                {filteredOrders.map(order => {
                  const statusDetails = getStatusDetails(order.orderStatus);
                  return (
                    <div key={order._id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="bg-[var(--Treasureana---Geocaching-App-1)] p-2 rounded-lg">
                              <Receipt className="text-[var(--Treasureana---Geocaching-App-8)]" size={20} />
                            </div>
                            <h3 className="font-bold text-gray-900">{order.orderId}</h3>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                            <Calendar size={16} className="text-gray-400" />
                            <span>{format(new Date(order.createdAt), 'MMM d, yyyy · h:mm a')}</span>
                          </div>
                        </div>
                        
                        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${statusDetails.color}`}>
                          {statusDetails.icon}
                          {statusDetails.text}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-sm font-semibold text-gray-700">Items</h4>
                          <span className="text-sm text-gray-500">{order.orderItems.length} items</span>
                        </div>
                        
                        <div className="space-y-3">
                          {order.orderItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Package className="text-gray-400" size={20} />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-800">{item.foodName}</p>
                                <p className="text-sm text-gray-500">{item.quantity} × Rs. {item.price.toLocaleString()}</p>
                              </div>
                              <p className="font-medium">Rs. {(item.quantity * item.price).toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-5 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <CreditCard className="text-gray-500" size={18} />
                            <span className="text-sm text-gray-600">
                              {order.paymentMethod === 'card' ? 'Credit Card' : 'Cash'}
                            </span>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="text-lg font-bold text-[var(--Treasureana---Geocaching-App-8)]">
                              Rs. {order.totalAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;