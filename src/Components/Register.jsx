import React, { useState } from 'react';
import SideImage from '../assets/Images/slide1.jpg';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // You would typically send this data to your backend
  };

  return (
    <div className='w-full min-h-screen flex flex-row bg-[var(--Treasureana---Geocaching-App-11)]'>
      {/* Image Section */}
      <div className='relative w-1/2 min-h-screen'>
        <img src={SideImage} alt="Side Image" className='absolute inset-0 w-full h-full object-cover' />
        <div className='absolute inset-0 bg-black/50 z-0'></div>
        <div className='flex flex-col relative z-10 gap-10 items-center justify-center h-full'>
          <h1 className='font-Pacifico text-5xl text-[var(--Treasureana---Geocaching-App-6)] text-center px-8'>
            The Ceylon Curry Club
          </h1>
          <p className='font-Funnel_Display text-[var(--Treasureana---Geocaching-App-6)] text-lg text-center px-12'>
            To Join with us Please put your informations with us and make tastfull future
          </p>
        </div>
      </div>

      {/* Registration Form Section */}
      <div className='w-1/2 min-h-screen flex items-center justify-center p-8'>
        <div className='w-full max-w-lg'>
          <div className='mb-10'>
            <h2 className='text-3xl font-bold mb-2 text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display'>Join with us</h2>
            <p className='text-[var(--Treasureana---Geocaching-App-9)] font-Funnel_Display'>Register your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
            {/* First Name & Last Name */}
            <div className='flex flex-row gap-4'>
              <div className='flex-1'>
                <label htmlFor='firstName' className='block text-sm font-medium text-[var(--Treasureana---Geocaching-App-8)] mb-1'>First Name*</label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display'
                  placeholder='Enter your first name'
                  required
                />
              </div>
              <div className='flex-1'>
                <label htmlFor='lastName' className='block text-sm font-medium text-[var(--Treasureana---Geocaching-App-8)] mb-1'>Last Name*</label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display'
                  placeholder='Enter your last name'
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-[var(--Treasureana---Geocaching-App-8)] mb-1'>Email*</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-300 text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display'
                placeholder='Enter your email'
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-[var(--Treasureana---Geocaching-App-8)] mb-1'>Password*</label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-300 text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display'
                placeholder='Create a password'
                required
              />
            </div>

            {/* Phone Number & Gender */}
            <div className='flex flex-row gap-4'>
              <div className='flex-1'>
                <label htmlFor='phoneNumber' className='block text-sm font-medium text-[var(--Treasureana---Geocaching-App-8)] mb-1'>Phone Number*</label>
                <input
                  type='tel'
                  id='phoneNumber'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display'
                  placeholder='Enter your phone number'
                  pattern='^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$'
                  title='Please enter a valid phone number'
                  required
                />
              </div>
              <div className='flex-1'>
                <label htmlFor='gender' className='block text-sm font-medium text-[var(--Treasureana---Geocaching-App-8)] mb-1'>Gender</label>
                <select
                  id='gender'
                  name='gender'
                  value={formData.gender}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display'
                >
                  <option value='' className='bg-[var(--Treasureana---Geocaching-App-11)]'>Select Gender</option>
                  <option value='male' className='bg-[var(--Treasureana---Geocaching-App-11)]'>Male</option>
                  <option value='female' className='bg-[var(--Treasureana---Geocaching-App-11)]'>Female</option>
                  <option value='other' className='bg-[var(--Treasureana---Geocaching-App-11)] text-[var()]'>Other</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full py-3 px-4 bg-[var(--Treasureana---Geocaching-App-8)] hover:bg-[var(--Treasureana---Geocaching-App-9)] text-[var(--Treasureana---Geocaching-App-11)] font-Funnel_Display font-medium rounded mt-6 transition duration-200'
            >
              Register Now
            </button>

            {/* Login Link */}
            <div className='text-center text-sm text-[var(--Treasureana---Geocaching-App-8)] mt-4 font-Funnel_Display'>
              Already have an account?{' '}
              <a href='/login' className='font-medium hover:underline'>
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;