import React from 'react'
import img1 from '../assets/Images/tasty_titbits_himg.jpg'
import img2 from '../assets/Images/punchi_mains_himg.jpg'
import img3 from '../assets/Images/appetite_arousers_himg.jpg'
import img4 from '../assets/Images/cocktail_pitchers_himg.jpg'
import { ArrowRight } from 'lucide-react'; 

function Selection() {
  return (
    <div className='flex flex-col justify-center w-full min-h-screen bg-[var(--Treasureana---Geocaching-App-7)] p-10 gap-10'>
      <div className='w-full gap-3 flex flex-col justify-center mb-12'>
        <h1 className='text-[var(--Treasureana---Geocaching-App-8)] text-xl uppercase font-Funnel_Display_Medium text-center'>Special Selection</h1>
        <h1 className='text-[var(--Treasureana---Geocaching-App-8)] font-Pacifico text-center text-5xl'>From our menu</h1>
      </div>
      
      {/* Category Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  justify-items-center cursor-pointer'>
        {/* Tasty Titbits*/}
        <div className="w-full max-w-[18rem] h-[25rem] group relative">
          <div className="w-full h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <img 
              src={img1} 
              alt="Tasty Titbits" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">

              <div className="absolute inset-0 bg-[var(--Treasureana---Geocaching-App-7)]/30"></div>
              <div className="absolute inset-0 backdrop-blur-[2px]"></div>
              <ArrowRight 
                className="relative z-10 w-10 h-10 text-[var(--Treasureana---Geocaching-App-9)]"
                strokeWidth={2}
              />
            </div>
          </div>
          
          {/* Text Container */}
          <div className="p-4 flex flex-col justify-center">
            <h2 className="text-lg font-Funnel_Display text-[var(--Treasureana---Geocaching-App-8)] text-center">Tasty Titbits</h2>
          </div>
        </div>
        
        {/* Punchi Mains */}
        <div className="w-full max-w-[18rem] h-[25rem] group relative cursor-pointer">
          <div className="w-full h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <img 
              src={img2} 
              alt="Punchi Main" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-[var(--Treasureana---Geocaching-App-7)]/30"></div>
              <div className="absolute inset-0 backdrop-blur-[2px]"></div>
              <ArrowRight 
                className="relative z-10 w-10 h-10 text-[var(--Treasureana---Geocaching-App-9)]"
                strokeWidth={2}
              />
            </div>
          </div>
          <div className="p-4 flex flex-col justify-center">
            <h2 className="text-lg font-Funnel_Display text-[var(--Treasureana---Geocaching-App-8)] text-center">Punchi Main</h2>
          </div>
        </div>
        
        {/* Appetite Arousers */}
        <div className="w-full max-w-[18rem] h-[25rem] group relative cursor-pointer">
          <div className="w-full h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <img 
              src={img3} 
              alt="Appetite Arousers" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-[var(--Treasureana---Geocaching-App-7)]/30"></div>
              <div className="absolute inset-0 backdrop-blur-[2px]"></div>
              <ArrowRight 
                className="relative z-10 w-10 h-10 text-[var(--Treasureana---Geocaching-App-9)]"
                strokeWidth={2}
              />
            </div>
          </div>
          <div className="p-4 flex flex-col justify-center">
            <h2 className="text-lg font-Funnel_Display text-[var(--Treasureana---Geocaching-App-8)] text-center">Appetite Arousers</h2>
          </div>
        </div>
        
        {/* Cocktail Pitchers */}
        <div className="w-full max-w-[18rem] h-[25rem] group relative cursor-pointer">
          <div className="w-full h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <img 
              src={img4} 
              alt="Cocktail Pitchers" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-[var(--Treasureana---Geocaching-App-7)]/30"></div>
              <div className="absolute inset-0 backdrop-blur-[2px]"></div>
              <ArrowRight 
                className="relative z-10 w-10 h-10 text-[var(--Treasureana---Geocaching-App-9)]"
                strokeWidth={2}
              />
            </div>
          </div>
          <div className="p-4 flex flex-col justify-center">
            <h2 className="text-lg font-Funnel_Display text-[var(--Treasureana---Geocaching-App-8)] text-center">Cocktail Pitchers</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Selection