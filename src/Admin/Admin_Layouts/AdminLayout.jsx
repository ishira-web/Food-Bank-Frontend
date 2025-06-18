import React from 'react'
import Sidebar from '../Admin_Components/Sidebar'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className='className="flex h-screen bg-gray-100"'>
        <Sidebar/>
        <main className='className="flex-1 overflow-y-auto"'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminLayout