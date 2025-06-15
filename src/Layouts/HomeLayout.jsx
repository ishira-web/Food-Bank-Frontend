import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import Selection from '../Components/Selection'
import UberEats from '../Components/UberEats'

function HomeLayout() {
  return (
    <div className='overflow-x-hidden pt-[5rem] bg-[var(--Treasureana---Geocaching-App-6)]'>
        <Navbar/>
        <Header/>
        <Selection/>
        <UberEats/>
        <Outlet/>
    </div>
  )
}

export default HomeLayout