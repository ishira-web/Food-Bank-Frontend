import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import OurStoryPage from './Pages/OurStoryPage'
import MenuPage from './Pages/MenuPage'
import { ToastContainer } from 'react-toastify'
import PaymentPage from './Pages/PaymentPage'
import ReservationPage from './Pages/ReservationPage'

function App() {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/our-story' element ={<OurStoryPage/>}/>
      <Route path='/menu' element={<MenuPage/>}/>
      <Route path='/order-pre-pay' element ={<PaymentPage/>}/>
      <Route path='/reservation' element ={<ReservationPage/>}/>
    </Routes>
    </>
  )
}

export default App