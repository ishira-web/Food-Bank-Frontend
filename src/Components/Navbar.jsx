import React from 'react';
import Logo from '../assets/Images/Logo.png';
import { Menu } from 'lucide-react';

function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--Treasureana---Geocaching-App-7)] shadow-md">
      <div className="max-w-7xl mx-auto px-3 h-[5rem] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className='h-auto' />
        </div>    
        <ul className="hidden md:flex items-center gap-8 text-[var(--Treasureana---Geocaching-App-4)] font-Funnel_Display group">
            <li className="cursor-pointer transition-all duration-200 ease-in-out hover:font-Funnel_Display_SemiBold hover:scale-105">
              Menu
            </li>
            <li className="cursor-pointer transition-all duration-200 ease-in-out hover:font-Funnel_Display_SemiBold hover:scale-105">
              About Us
            </li>
            <li className="cursor-pointer transition-all duration-200 ease-in-out hover:font-Funnel_Display_SemiBold hover:scale-105">
              Contact
            </li>
            <li className="cursor-pointer transition-all duration-200 ease-in-out hover:font-Funnel_Display_SemiBold hover:scale-105">
              Reservation
            </li>
        </ul>
        <div className="hidden md:flex ">
          <button className="bg-[var(--Treasureana---Geocaching-App-4)] w-[8rem] cursor-pointer text-[var(--Treasureana---Geocaching-App-7)] font-semibold px-8 py-2 transition">
            Login
          </button>
        </div>
        <div className="md:hidden">
          <Menu className="text-[var(--Treasureana---Geocaching-App-4)] w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
