import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import OurStoryPage from './Pages/OurStoryPage'
import MenuPage from './Pages/MenuPage'
import { ToastContainer } from 'react-toastify'
import PaymentPage from './Pages/PaymentPage'
import ReservationPage from './Pages/ReservationPage'
import Login from './Components/Login'
import Register from './Components/Register'


function App() {
  useEffect(()=>{window.scrollTo(0, 0)},[])
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/our-story' element ={<OurStoryPage/>}/>
      <Route path='/menu' element={<MenuPage/>}/>
      <Route path='/order-pre-pay' element ={<PaymentPage/>}/>
      <Route path='/reservation' element ={<ReservationPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </>
  )
}

export default App