import React from 'react'
import Navbar from '../Components/Navbar'
import AboutUs from '../Components/AboutUs'
import Footer from '../Components/Footer'

function AboutusLayout() {
  return (
    <div className='overflow-x-hidden pt-[5rem] bg-[var(--Treasureana---Geocaching-App-7)]'>
        <Navbar/>
        <AboutUs/>
        <Footer/>
    </div>
  )
}

export default AboutusLayout