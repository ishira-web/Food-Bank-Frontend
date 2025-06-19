import { Plus, ShoppingBag, Edit, Check, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [tempProfile, setTempProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/account/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data.data;
      setProfile(userData);
      setTempProfile({ ...userData });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
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

      const response = await axios.put(
        'http://localhost:5000/api/account/me',
        tempProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setTempProfile({
      ...tempProfile,
      [e.target.name]: e.target.value,
    });
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen bg-[var(--Treasureana---Geocaching-App-11)]'>
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
              <div className='w-32 h-32 rounded-full bg-[var(--Treasureana---Geocaching-App-8)] flex items-center justify-center overflow-hidden'>
                <span className='text-white text-4xl font-bold'>
                  {profile.firstName[0]}{profile.lastName[0]}
                </span>
              </div>
              {isEditing && (
                <button className='absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md'>
                  <Plus className='w-5 h-5' />
                </button>
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
                    value={tempProfile.gender}
                    onChange={handleChange}
                    className='w-full px-4 py-2 rounded-md border border-[var(--Treasureana---Geocaching-App-10)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-8)]'
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <div className='w-full px-4 py-2 rounded-md bg-gray-50 min-h-[42px]'>
                    {profile.gender || 'N/A'}
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

        {/* Order History Placeholder */}
        <div className='w-full md:w-1/2 min-h-screen bg-white p-8'>
          <div className='max-w-md mx-auto'>
            <h2 className='text-3xl font-bold mb-6 text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display'>
              My Orders
            </h2>
            <div className='text-center py-12'>
              <ShoppingBag className='w-16 h-16 mx-auto text-[var(--Treasureana---Geocaching-App-10)]' />
              <p className='mt-4 text-[var(--Treasureana---Geocaching-App-9)]'>No orders yet</p>
              <button className='mt-4 px-4 py-2 border border-[var(--Treasureana---Geocaching-App-8)] text-[var(--Treasureana---Geocaching-App-8)] rounded-md hover:bg-[var(--Treasureana---Geocaching-App-1)]'>
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
