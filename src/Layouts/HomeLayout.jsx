import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import Selection from '../Components/Selection'
import UberEats from '../Components/UberEats'
import MapPage from '../Components/MapPage'
import Footer from '../Components/Footer'

function HomeLayout() {
  return (
    <div className='overflow-x-hidden pt-[5rem] bg-[var(--Treasureana---Geocaching-App-6)]'>
        <Navbar/>
        <Header/>
        <Selection/>
        <UberEats/>
        <MapPage/>
        <Footer/>
        <Outlet/>
    </div>
  )
}

export default HomeLayout