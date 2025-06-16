import React from 'react'
import Menu from '../Components/Menu'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'

function MenuLayout() {
  return (
    <div className='overflow-x-hidden pt-[5rem] bg-[var(--Treasureana---Geocaching-App-7)]'>
        <Navbar/>
        <Menu/>
        <Footer/>
        <Outlet/>
    </div>
  )
}

export default MenuLayout