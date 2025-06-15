import React from 'react'
import Background from  '../assets/Images/odm-bg.jpg'
import Pickup from '../assets/Images/uber.jpg'
function UberEats() {
  return (
    <div className='flex w-full min-h-[50rem] bg-[var(--Treasureana---Geocaching-App-7)] z-20'>
        {/* Image Section */}
        <div className='relative w-1/2 min-h-[40rem] p-10 '>
          <img src={Background} alt="Background" className='object-cover w-full min-h-[40rem] ' />
          <div className='flex flex-col absolute gap-10  inset-0 justify-center items-center text-[var(--Treasureana---Geocaching-App-6)]'>
            <div className='flex flex-col gap-5 justify-center items-center w-[30rem]'>
            <h1 className='font-Funnel_Display text-lg'>Our</h1>
            <h1 className='font-Pacifico text-4xl'>Delivery Menu</h1>
            <h1 className='font-Funnel_Display text-xl  text-center'>We have a specialized delivery menu in keeping with your busy lifestyle!</h1>
            </div>
            <button className='w-[10rem] border border-[var(--Treasureana---Geocaching-App-3)] bg-[var(--Treasureana---Geocaching-App-7)] px-3 py-2 font-Funnel_Display'>View More</button>
          </div>
        </div>
        {/* Uber Eats Details */}
        <div className='w-1/2 flex flex-col justify-center items-center gap-10 text-[var(--Treasureana---Geocaching-App-6)]'>
          <div className='flex flex-col justify-center items-center w-full gap-5'>
            <h1 className='font-Funnel_Display text-xl'>FREE delivery within 10km radius from Colombo 01</h1>
            <h1 className='font-Funnel_Display text-5xl'>Call: 0773393391</h1>
            <h1 className='font-Funnel_Display text-lg'>Minimum order Rs. 1,500/- for Free Delivery</h1>
            <h1 className='font-Funnel_Display_Light text-sm'>Or available on</h1>
          </div>
          <img src={Pickup} alt="" />
        </div>
    </div>
  )
}

export default UberEats