import React from 'react'
import Navbar from '../Components/Navbar'
import Story from '../Components/Story'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'

function OurStoryLayout() {
  return (
    <div className='overflow-x-hidden pt-[5rem] bg-[var(--Treasureana---Geocaching-App-6)]'>
        <Navbar/>
        <Story/>
        <Footer/>
        <Outlet/>
    </div>
  )
}

export default OurStoryLayout