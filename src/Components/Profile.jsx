import { Plus, ShoppingBag, Edit, Check, X } from 'lucide-react';
import React, { useState , useEffect ,useContext} from 'react';
import { AuthContext } from '../Auth/authContext'; 
function Profile() {
    const { user: authUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [tempProfile, setTempProfile] = useState({...profile});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (authUser?._id) {
        try {
          const token = localStorage.getItem('token'); // Make sure you're storing the token
          const response = await fetch(`http://localhost:5000/api/account/${authUser._id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const userData = await response.json();
          setProfile({
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            address: userData.address || ""
          });
          setTempProfile({
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            address: userData.address || ""
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
    window.scrollTo(0, 0);
  }, [authUser]);

  const handleEditClick = () => {
    setTempProfile({...profile});
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/account/${authUser._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tempProfile)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setProfile(updatedUser);
      setIsEditing(false);
      // Optionally update the user in AuthContext/localStorage if needed
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
      [e.target.name]: e.target.value
    });
  };

  if (isLoading) {
    return (
      <div className='w-full min-h-screen bg-[var(--Treasureana---Geocaching-App-11)] text-[var(--Treasureana---Geocaching-App-6)] flex items-center justify-center'>
        <p>Loading profile...</p>
      </div>
    );
  }

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