import { Plus, ShoppingBag, Edit, Check, X } from 'lucide-react';
import React, { useState , useEffect} from 'react';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Ishira Pahasara",
    email: "ishirapahasara8@gmail.com",
    phone: "+94 77 123 4567",
    address: "123 Treasure Street, Colombo, Sri Lanka"
  });
  const [tempProfile, setTempProfile] = useState({...profile});

  const handleEditClick = () => {
    setTempProfile({...profile});
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setProfile({...tempProfile});
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setTempProfile({
      ...tempProfile,
      [e.target.name]: e.target.value
    });
  };
  useEffect(()=>{window.scrollTo(0, 0);})
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
              {isEditing ? "Edit your account details" : "Manage your account details"}
            </p>
            
            {/* Profile Picture */}
            <div className='relative mb-6'>
              <div className='w-32 h-32 rounded-full bg-[var(--Treasureana---Geocaching-App-8)] flex items-center justify-center overflow-hidden'>
                <span className='text-white text-4xl font-bold'>
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              {isEditing && (
                <button className='absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md'>
                  <Plus className='w-5 h-5'/>
                </button>
              )}
            </div>
            
            {/* Profile Details */}
            <div className='w-full space-y-6'>
              <div className='space-y-1'>
                <label className='block text-sm font-medium text-[var(--Treasureana---Geocaching-App-9)]'>Full Name</label>
                {isEditing ? (
                  <input
                    name="name"
                    type="text"
                    value={tempProfile.name}
                    onChange={handleChange}
                    className='w-full px-4 py-2 rounded-md border border-[var(--Treasureana---Geocaching-App-10)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-8)]'
                  />
                ) : (
                  <div className='w-full px-4 py-2 rounded-md bg-gray-50'>
                    {profile.name}
                  </div>
                )}
              </div>
              
              <div className='space-y-1'>
                <label className='block text-sm font-medium text-[var(--Treasureana---Geocaching-App-9)]'>Email</label>
                {isEditing ? (
                  <input
                    name="email"
                    type="email"
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
              
              <div className='space-y-1'>
                <label className='block text-sm font-medium text-[var(--Treasureana---Geocaching-App-9)]'>Phone</label>
                {isEditing ? (
                  <input
                    name="phone"
                    type="tel"
                    value={tempProfile.phone}
                    onChange={handleChange}
                    className='w-full px-4 py-2 rounded-md border border-[var(--Treasureana---Geocaching-App-10)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-8)]'
                  />
                ) : (
                  <div className='w-full px-4 py-2 rounded-md bg-gray-50'>
                    {profile.phone}
                  </div>
                )}
              </div>
              
              <div className='space-y-1'>
                <label className='block text-sm font-medium text-[var(--Treasureana---Geocaching-App-9)]'>Address</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={tempProfile.address}
                    onChange={handleChange}
                    rows={3}
                    className='w-full px-4 py-2 rounded-md border border-[var(--Treasureana---Geocaching-App-10)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-8)]'
                  />
                ) : (
                  <div className='w-full px-4 py-2 rounded-md bg-gray-50 min-h-[72px]'>
                    {profile.address}
                  </div>
                )}
              </div>
              
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
                      className='flex-1 px-6 py-3 border border-[var(--Treasureana---Geocaching-App-10)] text-[var(--Treasureana---Geocaching-App-9)] rounded-md hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2'
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
        
        {/* Order History Section */}
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