import React from 'react'
import TripAdvisor from '../assets/Images/TripAdvisor-Awards.png'
import { Facebook, Instagram } from 'lucide-react'
function MapPage() {
  return (
    <div className='flex flex-row w-full min-h-[50rem] bg-[var(--Treasureana---Geocaching-App-7)] z-20'>
        {/* Map */}
        <div className='w-1/2 min-h-[50rem]  relative'>
        <div className='w-full h-full  overflow-hidden  relative'>
          {/* Grayscale Filter Overlay */}
          <div className="absolute inset-0 bg-[var(--Treasureana---Geocaching-App-7)] mix-blend-multiply opacity-30 z-10 pointer-events-none"></div>
          
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.097705108219!2d101.59955187570104!3d3.0685580536412504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4986764af225%3A0x271cb5a50aeea842!2sCeylon%20Curry%20Club!5e0!3m2!1sen!2ssg!4v1750023127195!5m2!1sen!2ssg" 
            width="100%" 
            height="100%"
            className="min-h-[25rem] lg:min-h-[50rem] grayscale-[70%]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ceylon Curry Club Location"
          ></iframe>
        </div>
      </div>
       {/* Awards */}
       <div className='w-full lg:w-1/2 min-h-[50rem] p-4 lg:p-8 flex flex-col gap-10 justify-center items-center bg-[var(--Treasureana---Geocaching-App-11)]'>
          <div className='w-full lg:w-1/2 flex flex-col justify-center items-center gap-4 text-[var(--Treasureana---Geocaching-App-8)]'>
            <h1 className='font-Funnel_Display text-xl'>Easy way to</h1>
            <h1 className='font-Pacifico text-5xl'>Find Us</h1>
            <div className='flex flex-col justify-center items-center'>
            <h1 className='font-Funnel_Display text-sm'>Ceylon Curry Club,</h1>
            <h1 className='font-Funnel_Display text-sm text-center'>No. 2&3, Dutch Hospital Shopping Precinct, Colombo 01</h1>
            </div>
            <h1 className='font-Funnel_Display text-xs text-center'>Tel: 0114266363</h1>
            {/* social media */}
            <div className='flex flex-row gap-5'>
                <Facebook className='w-5 text-[var(--Treasureana---Geocaching-App-3)]'/>
                <Instagram className='w-5 text-[var(--Treasureana---Geocaching-App-3)]'/>
            </div>
          </div>
          <div>
            <img src={TripAdvisor} alt="Trip-Advisor-Awards" className='w-[15rem] ' />
          </div>
       </div>
    </div>
  )
}

export default MapPage