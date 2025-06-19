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
import AdminRoutes from './Admin/Admin_Routes/AdminRoutes'
import { AuthContext } from './Auth/authContext'
import Profile from './Pages/Profile'


function App() {
  useEffect(()=>{window.scrollTo(0, 0)},[])
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000}/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/our-story' element ={<OurStoryPage/>}/>
      <Route path='/menu' element={<MenuPage/>}/>
      <Route path='/order-pre-pay' element ={<PaymentPage/>}/>
      <Route path='/reservation' element ={<ReservationPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/admin/*' element={<AdminRoutes/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </>
  )
}

export default App