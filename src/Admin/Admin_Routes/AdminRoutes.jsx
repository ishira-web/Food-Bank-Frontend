import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../Admin_Layouts/AdminLayout'
import Dashboard from '../Admin_Components/Dashboard'

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes