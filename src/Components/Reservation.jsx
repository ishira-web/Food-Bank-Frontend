import React from 'react';

function Reservation() {
  return (
    <div className='w-full min-h-screen flex flex-col gap-8 px-4 md:px-10 py-10 bg-[var(--Treasureana---Geocaching-App-7)]'>
      {/* Header Section */}
      <div className='flex flex-col gap-4 text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display max-w-[20rem]'>
        <h1 className='text-sm font-medium'>Book Your Table Today</h1>
        <h1 className='text-2xl font-bold'>Make a Reservation</h1>
      </div>

      {/* Introduction Section */}
      <div className='w-full flex flex-col items-center gap-6 text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display'>
        <h1 className='text-3xl md:text-5xl font-bold'>Reserve a Table</h1>
        <p className='text-base md:text-lg max-w-4xl text-center'>
          The Ceylone Curry Club Restaurant Complex is the number one selected Restaurant in this region and therefore gets extremely busy especially between 7 – 9 pm. We strongly recommend that you make a reservation to guarantee your seating times as requested.
        </p>
      </div>

      {/* Reservation Form */}
      <div className='flex flex-col items-center mt-10 w-full font-Funnel_Display'>
        <div className='flex flex-col gap-6 text-[var(--Treasureana---Geocaching-App-8)] w-full max-w-4xl'>
          <div className='text-center'>
            <h1 className='text-3xl md:text-3xl font-Funnel_Display_SemiBold'>Make a Reservation...</h1>
            <p className='text-sm mt-2 text-[var(--Treasureana---Geocaching-App-8)]'>
              Any online bookings need to be made before 6 pm on the day of arrival as our emails will not be monitored during busy service times.
            </p>
          </div>

          <form className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
            {/* Name and Contact */}
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

            {/* Email and Country */}
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

            {/* Guests */}
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

            {/* Date and Time */}
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

            {/* Special Notes */}
            <div className='md:col-span-2 space-y-2'>
              <label htmlFor='notes' className='block text-sm font-medium'>Special Notes<span className='text-[var(--Treasureana---Geocaching-App-5)]'>*</span></label>
              <textarea id='notes'name='notes' rows='3'placeholder='Any special requests or dietary requirements...' className='w-full px-4 py-2 border border-[var(--Treasureana---Geocaching-App-8)]'></textarea>
            </div>

            {/* Submit Button */}
            <div className='md:col-span-2 flex justify-center mt-4'>
              <button type='submit' className='px-8 py-3 bg-[var(--Treasureana---Geocaching-App-6)] text-[var(--Treasureana---Geocaching-App-7)]  rounded-md hover:bg-opacity-90 transition duration-300 font-medium'>
                Reserve a Table
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reservation;