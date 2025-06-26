import React, { useState } from 'react';
import ImageBG from '../assets/Images/slide1.jpg'
function Reservation() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    numberOfAdults: 1,
    numberOfChildren: 0,
    reservedDate: '',
    reservedTime: '',
    specialNote: '',
    country: ''
  });
  
  const [message, setMessage] = useState({ type: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', content: '' });
    
    try {
      // Prepare payload (excluding country field)
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        numberOfAdults: Number(formData.numberOfAdults),
        numberOfChildren: Number(formData.numberOfChildren),
        reservedDate: formData.reservedDate,
        reservedTime: formData.reservedTime,
        specialNote: formData.specialNote
      };
      
      // Validation
      if (!payload.fullName || !payload.email || !payload.phoneNumber || 
          !payload.numberOfAdults || !payload.reservedDate || !payload.reservedTime) {
        throw new Error('Required fields are missing');
      }
      
      // Mock backend URL
      const response = await fetch('http://localhost:5000/api/reservation/create-reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create reservation');
      }
      
      setMessage({ 
        type: 'success', 
        content: 'Reservation created successfully!' 
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        numberOfAdults: 1,
        numberOfChildren: 0,
        reservedDate: '',
        reservedTime: '',
        specialNote: '',
        country: ''
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        content: error.message || 'Failed to create reservation' 
      });
    } finally {
      setIsSubmitting(false);
    }
    useEffect(()=>{window.scrollTo(0, 0);},[])
  };
  
  return (
    <div className='w-full min-h-screen flex flex-col font-Funnel_Display gap-8 px-4 md:px-10 bg-[var()]'>
      <div className='relative h-96'>
        
        
        
        <div className='absolute inset-0 w-full h-full '>
          <div className='absolute  bg-black/50 z-10'></div> 
           <img src={ImageBG} alt="" className='absolute inset-0 w-full h-[20rem] object-cover z-10 ' />
        </div>
        <div className='relative z-10 flex flex-col gap-4 text-white font-sans w-full p-6 pt-20'>
          <h1 className='text-sm font-Funnel_Display_Medium'>Book Your Table Today</h1>
          <h1 className='text-4xl font-Funnel_Display_SemiBold'>Make a Reservation</h1>
        </div>
      </div>
      
      <div className='w-full flex flex-col items-center gap-6 text-[var(--Treasureana---Geocaching-App-9)] font-Funnel_Display'>
        <h1 className='text-3xl md:text-5xl font-bold'>Reserve a Table</h1>
        <p className='text-base md:text-lg max-w-4xl text-center'>
          The Ceylone Curry Club Restaurant Complex is the number one selected Restaurant in this region and therefore gets extremely busy especially between 7 – 9 pm. We strongly recommend that you make a reservation to guarantee your seating times as requested.
        </p>
      </div>
      
      <div className='flex flex-col items-center mt-10 font-Funnel_Display w-full text-[var(--Treasureana---Geocaching-App-9)]'>
        <div className='flex flex-col gap-6  w-full max-w-4xl'>
          <div className='text-center'>
            <h1 className='text-3xl md:text-3xl font-semibold'>Make a Reservation...</h1>
            <p className='text-sm mt-2 text-[var(--Treasureana---Geocaching-App-9)]'>
              Any online bookings need to be made before 6 pm on the day of arrival as our emails will not be monitored during busy service times.
            </p>
          </div>

          {message.content && (
            <div className={`p-4 rounded-md ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {message.content}
            </div>
          )}

          <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
            <div className='space-y-2'>
              <label htmlFor='fullName' className='block text-sm font-medium'>
                Full Name<span className='text-red-500'>*</span>
              </label>
              <input 
                type='text' 
                id='fullName' 
                name='fullName'
                value={formData.fullName}
                onChange={handleChange}
                placeholder='Your Name' 
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='phoneNumber' className='block text-sm font-medium'>
                Contact Number<span className='text-red-500'>*</span>
              </label>
              <input 
                type='tel' 
                id='phoneNumber' 
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder='Phone Number' 
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600'
                required
              />
            </div>
            
            <div className='space-y-2'>
              <label htmlFor='email' className='block text-sm font-medium'>
                Email Address<span className='text-red-500'>*</span>
              </label>
              <input 
                type='email' 
                id='email' 
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Your Email' 
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600'
                required
              />
            </div>
            
            <div className='space-y-2'>
              <label htmlFor='country' className='block text-sm font-medium'>
                Country<span className='text-red-500'>*</span>
              </label>
              <select 
                id='country' 
                name='country'
                value={formData.country}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600'
                required
              >
                <option value="" className='bg-[var(--Treasureana---Geocaching-App-11)]'>Select Country</option>
                <option value="Sri Lanka" className='bg-[var(--Treasureana---Geocaching-App-11)]' >Sri Lanka</option>
                <option value="India" className='bg-[var(--Treasureana---Geocaching-App-11)]'>India</option>
                <option value="UK" className='bg-[var(--Treasureana---Geocaching-App-11)]'>United Kingdom</option>
                <option value="USA" className='bg-[var(--Treasureana---Geocaching-App-11)]'>United States</option>
                <option value="Other" className='bg-[var(--Treasureana---Geocaching-App-11)]'>Other</option>
              </select>
            </div>
            
            <div className='space-y-2'>
              <label htmlFor='numberOfAdults' className='block text-sm font-medium'>
                Number of Adults<span className='text-red-500'>*</span>
              </label>
              <input 
                type='number' 
                id='numberOfAdults' 
                name='numberOfAdults'
                value={formData.numberOfAdults}
                onChange={handleChange}
                min='1' 
                placeholder='Adults' 
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600'
                required
              />
            </div>
            
            <div className='space-y-2'>
              <label htmlFor='numberOfChildren' className='block text-sm font-medium'>
                Number of Children
              </label>
              <input 
                type='number' 
                id='numberOfChildren' 
                name='numberOfChildren'
                value={formData.numberOfChildren}
                onChange={handleChange}
                min='0' 
                placeholder='Children' 
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600'
              />
            </div>
            
            <div className='space-y-2'>
              <label htmlFor='reservedDate' className='block text-sm font-medium'>
                Date<span className='text-red-500'>*</span>
              </label>
              <input 
                type='date' 
                id='reservedDate' 
                name='reservedDate'
                value={formData.reservedDate}
                onChange={handleChange}
                className='w-full px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600'
                required
              />
            </div>
            
            <div className='space-y-2'>
              <label htmlFor='reservedTime' className='block text-sm font-medium'>
                Time<span className='text-red-500'>*</span>
              </label>
              <input 
                type='time' 
                id='reservedTime' 
                name='reservedTime'
                value={formData.reservedTime}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600' 
                required
              />
            </div>
            
            <div className='md:col-span-2 space-y-2'>
              <label htmlFor='specialNote' className='block text-sm font-medium'>
                Special Notes
              </label>
              <textarea 
                id='specialNote'
                name='specialNote'
                value={formData.specialNote}
                onChange={handleChange}
                rows='3'
                placeholder='Any special requests or dietary requirements...' 
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600'
              ></textarea>
            </div>
            
            <div className='md:col-span-2 flex justify-center mt-4'>
              <button 
                type='submit' 
                disabled={isSubmitting}
                className={`px-8 py-3 text-white rounded-md transition duration-300 font-medium ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-amber-700 hover:bg-amber-800'
                }`}
              >
                {isSubmitting ? (
                  <span className='flex items-center'>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Reserve a Table'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className='flex flex-col gap-5 w-full text-center text-[var(--Treasureana---Geocaching-App-9)] py-10'>
        <h1 className='text-2xl font-semibold p-2'>PRICING POLICY</h1>
        <p className='text-sm mt-2'>
          As a foreign investor we take OUR responsibilities in Sri Lanka very seriously. Please kindly consider when traveling throughout this beautiful island in supporting the services of correctly registered businesses with the Tourist Board and local government departments.
        </p>
        <p className='text-sm mt-2'>
          These companies like Lords are correctly paying their government taxes from their sales revenue as follows VAT Tax 18%, SSCL Tax 2.5%, 1% Tourist Board Levy Tax, 1% Local Government Tax
        </p>
        <p className='text-sm mt-3'>
          These taxes paid by professional organizations help in developing this beautiful country for visiting tourists like yourselves and for the local Sri Lankan People
        </p>
        <p className='text-sm mt-2'>
          The 10 % Service Charge is shared with all employees of our company
        </p>
        <h1 className='text-lg font-bold mt-5'>Thank you …</h1>
      </div>
    </div>
  );
}

export default Reservation;