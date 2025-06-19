import React from 'react'
import Navbar from '../Components/Navbar'
import Profile from '../Components/Profile'
import Footer from '../Components/Footer'

function ProfileLayout() {
  return (
    <div className='overflow-x-hidden pt-[5rem] bg-[var(--Treasureana---Geocaching-App-7)]'>
        <Navbar/>
        <Profile/>
        <Footer/>
    </div>
  )
}

export default ProfileLayout