import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../Admin_Layouts/AdminLayout'
import Dashboard from '../Admin_Components/Dashboard'
import Admin from '../Admin_Components/Admin'
import ManageFoods from '../Admin_Components/ManageFoods'
import ManageUSers from '../Admin_Components/ManageUSers'
import ManageGallery from '../Admin_Components/ManageGallery'
import ManageOrders from '../Admin_Components/ManageOrders'
import ManageCategories from '../Admin_Components/ManageCategories'
import ManageReservation from '../Admin_Components/ManageReservation'

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />}/>
        <Route path="admins" element={<Admin/>} />
        <Route path="foods" element={<ManageFoods/>} />
        <Route path='categories' element={<ManageCategories/>} />
        <Route path="users" element={<ManageUSers/>} />
        <Route path="gallery" element={<ManageGallery/>} />
        <Route path="orders" element={<ManageOrders/>} />
        <Route path="reservations" element={<ManageReservation/>} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes