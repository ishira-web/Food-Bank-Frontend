import React from 'react'
import img1 from '../assets/Images/tasty_titbits_himg.jpg'
import img2 from '../assets/Images/punchi_mains_himg.jpg'
import img3 from '../assets/Images/appetite_arousers_himg.jpg'
import img4 from '../assets/Images/cocktail_pitchers_himg.jpg'

function Selection() {
  return (
    <div className='flex flex-col w-full min-h-screen bg-[var(--Treasureana---Geocaching-App-7)] p-10 gap-10'>
      <div className='w-full gap-3 flex flex-col justify-center mb-12'>
        <h1 className='text-[var(--Treasureana---Geocaching-App-8)] text-xl uppercase font-Funnel_Display_Medium text-center'>Special Selection</h1>
        <h1 className='text-[var(--Treasureana---Geocaching-App-8)] font-Pacifico text-center text-5xl'>From our menu</h1>
      </div>
      
      {/* Category Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center'>
        {/* Tasty Titbits */}
         <div>
             <div className='w-full max-w-[18rem] h-[25rem] bg-[var(--Treasureana---Geocaching-App-9)] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'>
             <img src={img1} alt="Tasty Titbits" className='w-full h-full object-cover'/>
        </div>
        <div className='p-4 h-2/5 flex flex-col justify-center'>
               <h2 className='text-lg font-Funnel_Display text-[var(--Treasureana---Geocaching-App-8)] text-center'>Tasty Titbits</h2>
             </div>
         </div>
        
        {/* Punchi Mains */}
        <div>
        <div className='w-full max-w-[18rem] h-[25rem] bg-[var(--Treasureana---Geocaching-App-9)] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'>
          <img src={img2} alt="Punchi Mains" className='w-full h-full object-cover'/>
        </div>
         <div className='p-4 h-2/5 flex flex-col justify-center'>
            <h2 className='text-lg font-Funnel_Display text-[var(--Treasureana---Geocaching-App-8)] text-center'>Punchi Mains</h2>
          </div>
        </div>
        
        {/* Appetite Arousers */}
       <div>
         <div className='w-full max-w-[18rem] h-[25rem] bg-[var(--Treasureana---Geocaching-App-9)] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'>
          <img src={img3} alt="Appetite Arousers" className='w-full h-full object-cover'/>
        </div>
         <div className='p-4 h-2/5 flex flex-col justify-center'>
            <h2 className='text-lg font-Funnel_Display text-[var(--Treasureana---Geocaching-App-8)] text-center'>Appetite Arousers</h2>
          </div>
       </div>
        
        {/* Cocktail Pitchers */}
        <div>
        <div className='w-full max-w-[18rem] h-[25rem] bg-[var(--Treasureana---Geocaching-App-9)] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'>
          <img src={img4} alt="Cocktail Pitchers" className='w-full h-full object-cover'/>
        </div>
        <div className='p-4 h-2/5 flex flex-col justify-center'>
            <h2 className='text-lg font-Funnel_Display text-[var(--Treasureana---Geocaching-App-8)] text-center'>Cocktail Pitchers</h2>
          </div>
        </div>
       
        
      </div>
    </div>
  )
}

export default Selection