import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import OurStoryPage from './Pages/OurStoryPage'
import MenuPage from './Pages/MenuPage'
import { ToastContainer } from 'react-toastify'
import ReservationPage from './Pages/ReservationPage'
import Login from './Components/Login'
import Register from './Components/Register'
import AdminRoutes from './Admin/Admin_Routes/AdminRoutes'
import Profile from './Pages/Profile'
import OrderPage from './Pages/OrderPage'
import AboutusPage from './Pages/AboutusPage'


function App() {
  useEffect(()=>{window.scrollTo(0, 0)},[])
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000}/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/our-story' element ={<OurStoryPage/>}/>
      <Route path='/menu' element={<MenuPage/>}/>
      <Route path='/reservation' element ={<ReservationPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/admin/*' element={<AdminRoutes/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/order-page' element={<OrderPage/>}/>
      <Route path='/about' element={<AboutusPage/>}/>
    </Routes>
    </>
  )
}

export default App