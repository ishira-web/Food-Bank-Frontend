import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Slide1 from '../assets/Images/slide1.jpg';
import Slide2 from '../assets/Images/slide2.jpg';
import Slide3 from '../assets/Images/slide3.jpg';
import Slide4 from '../assets/Images/slide4.jpg';
import Slide5 from '../assets/Images/slide5.jpg';

function Header() {
  return (
    <div className='w-full min-h-screen relative'>
      {/* Swiper slider */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect={'fade'}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
        className='w-full h-full'
      >
        <SwiperSlide>
          <img src={Slide1} alt="Slide 1" className='w-full h-screen object-cover' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide2} alt="Slide 2" className='w-full h-screen object-cover' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide3} alt="Slide 3" className='w-full h-screen object-cover' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide4} alt="Slide 4" className='w-full h-screen object-cover' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide5} alt="Slide 5" className='w-full h-screen object-cover' />
        </SwiperSlide>
      </Swiper>
      <div className='absolute inset-0 flex flex-col items-center gap-10 justify-center z-20 bg-[var(--Treasureana---Geocaching-App-7)]/60'>
        <h1 className='text-[var(--Treasureana---Geocaching-App-6)] text-4xl md:text-6xl font-Funnel_Display text-center'>
          Welcome to the <span className='font-Pacifico'>Ceylon Curry Club</span>
        </h1>
        <p className='text-[var(--Treasureana---Geocaching-App-6)] text-2xl font-Funnel_Display'>
         Spices hold many secrets. They are a repository of culture and heritage; an articulation of tradition and ritual. 
        </p>
        <div className='flex flex-row gap-5'>
          <button className='w-[10rem] bg-[var(--Treasureana---Geocaching-App-4)] py-2 text-[var(--Treasureana---Geocaching-App-7)] font-Funnel_Display'>View Menu</button>
          <button className='w-[10rem] bg-[var(--Treasureana---Geocaching-App-4)] py-2 text-[var(--Treasureana---Geocaching-App-7)] font-Pacifico'>Reservation</button>
        </div>
      </div>
    </div>
  );
}

export default Header;