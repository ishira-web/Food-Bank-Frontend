import React from 'react'
import Payment from '../Components/Payment'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function PaymentLayout() {
  return (
    <div className='overflow-x-hidden pt-[5rem] bg-[var(--Treasureana---Geocaching-App-7)]'>
        <Navbar/>
        <Payment/>
        <Footer/>
    </div>
  )
}

export default PaymentLayout