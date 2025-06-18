import React, { useEffect } from 'react';
import BG from '../assets/Images/slide1.jpg'
function Reservation() {
  useEffect(()=>{window.scrollTo(0, 0);})
  return (
    <div className='w-full min-h-screen flex flex-col gap-8 px-4 md:px-10  bg-[var(--Treasureana---Geocaching-App-7)]'>
  <div className='relative'>
  <div className='absolute inset-0 bg-black/50 z-0'></div> 
  <img src={BG} alt='Background' className='absolute inset-0 w-full h-full object-cover z-0'/>
  <div className='relative z-10 flex flex-col gap-4 text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display max-w-[20rem] p-6'>
    <h1 className='text-sm font-medium'>Book Your Table Today</h1>
    <h1 className='text-2xl font-bold'>Make a Reservation</h1>
  </div>
</div>
      <div className='w-full flex flex-col items-center gap-6 text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display'>
        <h1 className='text-3xl md:text-5xl font-bold'>Reserve a Table</h1>
        <p className='text-base md:text-lg max-w-4xl text-center'>
          The Ceylone Curry Club Restaurant Complex is the number one selected Restaurant in this region and therefore gets extremely busy especially between 7 – 9 pm. We strongly recommend that you make a reservation to guarantee your seating times as requested.
        </p>
      </div>
      <div className='flex flex-col items-center mt-10 w-full font-Funnel_Display'>
        <div className='flex flex-col gap-6 text-[var(--Treasureana---Geocaching-App-8)] w-full max-w-4xl'>
          <div className='text-center'>
            <h1 className='text-3xl md:text-3xl font-Funnel_Display_SemiBold'>Make a Reservation...</h1>
            <p className='text-sm mt-2 text-[var(--Treasureana---Geocaching-App-8)]'>
              Any online bookings need to be made before 6 pm on the day of arrival as our emails will not be monitored during busy service times.
            </p>
          </div>

          <form className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
            <div className='space-y-2'>
              <label htmlFor='name' className='block text-sm font-medium'>Full Name<span className='text-[var(--Treasureana---Geocaching-App-5)]'>*</span></label>
              <input 
                type='text' 
                id='name' 
                name='name' 
                placeholder='Your Name' 
                className='w-full px-4 py-2 border border-[var(--Treasureana---Geocaching-App-8)]'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='contact' className='block text-sm font-medium'>Contact Number<span className='text-[var(--Treasureana---Geocaching-App-5)]'>*</span></label>
              <input 
                type='tel' 
                id='contact' 
                name='contact' 
                placeholder='Phone Number' 
                className='w-full px-4 py-2 border border-[var(--Treasureana---Geocaching-App-8)]'
                required
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='email' className='block text-sm font-medium'>Email Address<span className='text-[var(--Treasureana---Geocaching-App-5)]'>*</span></label>
              <input 
                type='email' 
                id='email' 
                name='email' 
                placeholder='Your Email' 
                className='w-full px-4 py-2 border border-[var(--Treasureana---Geocaching-App-8)] rounded-md'
                required
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='country' className='block text-sm font-medium'>Country<span className='text-[var(--Treasureana---Geocaching-App-5)]'>*</span></label>
              <select 
                id='country' 
                name='country' 
                className='w-full px-4 py-2 border border-[var(--Treasureana---Geocaching-App-8)]'
              >
                <option value="" className='bg-[var(--Treasureana---Geocaching-App-7)]'>Select Country</option>
                <option value="Sri Lanka" className='bg-[var(--Treasureana---Geocaching-App-7)]' >Sri Lanka</option>
                <option value="India" className='bg-[var(--Treasureana---Geocaching-App-7)]'>India</option>
                <option value="UK" className='bg-[var(--Treasureana---Geocaching-App-7)]'>United Kingdom</option>
                <option value="USA" className='bg-[var(--Treasureana---Geocaching-App-7)]'>United States</option>
                <option value="Other" className='bg-[var(--Treasureana---Geocaching-App-7)]'>Other</option>
              </select>
            </div>
            <div className='space-y-2'>
              <label htmlFor='adults' className='block text-sm font-medium'>Number of Adults<span className='text-[var(--Treasureana---Geocaching-App-5)]'>*</span></label>
              <input 
                type='number' 
                id='adults' 
                name='adults' 
                min='1' 
                placeholder='Adults' 
                className='w-full px-4 py-2 border border-[var(--Treasureana---Geocaching-App-8)]'
                required
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='children' className='block text-sm font-medium'>Number of Children<span className='text-[var(--Treasureana---Geocaching-App-5)]'>*</span></label>
              <input 
                type='number' 
                id='children' 
                name='children' 
                min='0' 
                placeholder='Children' 
                className='w-full px-4 py-2 border border-[var(--Treasureana---Geocaching-App-8)]'
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='date' className='block text-sm font-medium'>Date<span className='text-[var(--Treasureana---Geocaching-App-5)]'>*</span></label>
              <input 
                type='date' 
                id='date' 
                name='date' 
                className='w-full px-4 py-2 border border-[var(--Treasureana---Geocaching-App-8)]'
                required
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='time' className='block text-sm font-medium'>Time<span className='text-[var(--Treasureana---Geocaching-App-5)]'>*</span></label>
              <input type='time' id='time' name='time' className='w-full px-4 py-2 border border-[var(--Treasureana---Geocaching-App-8)]' required/>
            </div>
            <div className='md:col-span-2 space-y-2'>
              <label htmlFor='notes' className='block text-sm font-medium'>Special Notes<span className='text-[var(--Treasureana---Geocaching-App-5)]'>*</span></label>
              <textarea id='notes'name='notes' rows='3'placeholder='Any special requests or dietary requirements...' className='w-full px-4 py-2 border border-[var(--Treasureana---Geocaching-App-8)]'></textarea>
            </div>
            <div className='md:col-span-2 flex justify-center mt-4'>
              <button type='submit' className='px-8 py-3 bg-[var(--Treasureana---Geocaching-App-6)] text-[var(--Treasureana---Geocaching-App-7)]  rounded-md hover:bg-opacity-90 transition duration-300 font-medium'>
                Reserve a Table
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='flex flex-col gap-5w-full text-center text-[var(--Treasureana---Geocaching-App-8)]'>
        <h1 className='text-2xl font-Funnel_Display p-2'>PRICING POLICY</h1>
        <p className='text-sm font-Funnel_Display mt-2'>As a foreign investor we take OUR responsibilities in Sri Lanka very seriously.Please kindly consider when traveling throughout this beautiful island in supporting the services of correctly registered businesses with the Tourist Board and local government departments.</p>
        <p className='text-sm font-Funnel_Display mt-2'>These companies like Lords are correctly paying their government taxes from their sales revenue as follows VAT Tax 18%, SSCL Tax 2.5%, 1% Tourist Board Levy Tax, 1% Local Government Tax</p>
        <p className='text-sm font-Funnel_Display mt-3'>These taxes paid by professional organizations help in developing this beautiful country for visiting tourists like yourselves and for the local Sri Lankan People</p>
        <p className='text-sm font-Funnel_Display mt-2'>The 10 % Service Charge is shared with all employees of our company</p>
        <h1 className='text-lg font-Funnel_Display_Bold mt-5'>Thank you …</h1>
      </div>
    </div>
  );
}

export default Reservation;