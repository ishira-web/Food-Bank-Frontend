import React from 'react'
import Navbar from '../Components/Navbar'
import Reservation from '../Components/Reservation'
import Footer from '../Components/Footer'

function ReservationLayout() {
  return (
    <div className='overflow-x-hidden pt-[5rem] bg-[var(--Treasureana---Geocaching-App-7)]'>
        <Navbar/>
        <Reservation/>
        <Footer/>
    </div>
  )
}

export default ReservationLayout