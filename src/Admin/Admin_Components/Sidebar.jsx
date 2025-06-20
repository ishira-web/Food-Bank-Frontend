import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
    const menuItems = [
        {name : 'Dashboard' ,path : "dashboard"},
        {name : "Manage Admins" , path : "admins"},
        {name : "Manage Foods", path : "foods"},
        {name : "Manage Categories" , path : "categories"},
        {name : "Manage Users" , path : "users"},
        {name : "Manage Orders" , path : "orders"},
        {name : "Manage Gallery" , path : "gallery"},
        {name : "Manage Reservations" , path : "reservations"}
    ]
  return (
    <div className='w-64 h-screen bg-[var(--Treasureana---Geocaching-App-11)] text-white font-poppins fixed left-0 top-0 shadow-lg flex flex-col py-6 px-4'>
      <h1 className='text-2xl font-semibold mb-8 text-center font-Funnel_Display_SemiBold'>Admin Dashboard</h1>
      <nav className='flex flex-col gap-4 font-Funnel_Display'>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded transition-colors ${
                isActive ? 'bg-blue-500' : 'hover:bg-blue-500'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      <button className='mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors w-full text-center'> 
        Logout
      </button>
    </div>
  )
}

export default Sidebar