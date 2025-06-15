import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'

function HomeLayout() {
  return (
    <div className='overflow-x-hidden pt-[5rem] bg-[var(--Treasureana---Geocaching-App-6)]'>
        <Navbar/>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default HomeLayout