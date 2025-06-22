import React from 'react'
import Navbar from '../Components/Navbar'
import Order from '../Components/Order'
import Footer from '../Components/Footer'

function OrderLayout() {
  return (
    <div className='overflow-x-hidden pt-[5rem] bg-[var(--Treasureana---Geocaching-App-7)]'>
        <Navbar/>
        <Order/>
        <Footer/>
    </div>
  )
}

export default OrderLayout