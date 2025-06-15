import React from 'react'
import Logo from '../assets/Images/Logo.png';
import { 
  Home, 
  Utensils, 
  BookOpen, 
  Users, 
  Phone, 
  CalendarDays,
  MapPin,
  Clock,
  Mail,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';

function Footer() {
  return (
    <div className='w-full bg-[var(--Treasureana---Geocaching-App-7)] py-12 px-10'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10'>
        
        {/* Logo Column */}
        <div className='flex flex-col items-start font-Funnel_Display'>
          <img src={Logo} alt="Logo" className='h-16 mb-6' />
          <p className='text-[var(--Treasureana---Geocaching-App-8)] mb-4'>
            Authentic Sri Lankan cuisine with modern flair.
          </p>
          <div className='flex gap-4'>
            <a href="#" className='text-[var(--Treasureana---Geocaching-App-8)] hover:text-amber-600 transition-colors'>
              <Facebook size={24} />
            </a>
            <a href="#" className='text-[var(--Treasureana---Geocaching-App-8)] hover:text-amber-600 transition-colors'>
              <Instagram size={24} />
            </a>
            <a href="#" className='text-[var(--Treasureana---Geocaching-App-8)] hover:text-amber-600 transition-colors'>
              <Twitter size={24} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className='flex flex-col font-Funnel_Display'>
          <h3 className='text-xl font-bold text-[var(--Treasureana---Geocaching-App-8)] mb-6 flex items-center gap-2 font-Funnel_Display'>
          Quick Links
          </h3>
          <ul className='flex flex-col gap-3 text-[var(--Treasureana---Geocaching-App-8)]'>
            <li className='flex items-center gap-2 hover:text-amber-600 transition-colors cursor-pointer'>
            Menu
            </li>
            <li className='flex items-center gap-2 hover:text-amber-600 transition-colors cursor-pointer'>
            Our Story
            </li>
            <li className='flex items-center gap-2 hover:text-amber-600 transition-colors cursor-pointer'>
            About Us
            </li>
            <li className='flex items-center gap-2 hover:text-amber-600 transition-colors cursor-pointer'>
            Contact
            </li>
            <li className='flex items-center gap-2 hover:text-amber-600 transition-colors cursor-pointer'>
            Reservations
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className='flex flex-col'>
          <h3 className='text-xl font-bold text-[var(--Treasureana---Geocaching-App-8)] mb-6 flex items-center gap-2'>
           Contact Us
          </h3>
          <ul className='flex flex-col gap-3 text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display'>
            <li className='flex items-start gap-2'>
              <MapPin size={16} className='mt-1' />
              <span>123 Curry Lane, Colombo District, Sri Lanka</span>
            </li>
            <li className='flex items-center gap-2'>
              <Phone size={16} />
              <span>+94 112 345 678</span>
            </li>
            <li className='flex items-center gap-2'>
              <Mail size={16} />
              <span>hello@ceyloncurryclub.com</span>
            </li>
            <li className='flex items-center gap-2'>
              <Clock size={16} />
              <span>Open Daily: 11AM - 10PM</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className='flex flex-col font-Funnel_Display'>
          <h3 className='text-xl font-bold text-[var(--Treasureana---Geocaching-App-8)] mb-6'>
            Newsletter
          </h3>
          <p className='text-[var(--Treasureana---Geocaching-App-8)] mb-4'>
            Subscribe for updates and special offers
          </p>
          <div className='flex'>
            <input 
              type="email" 
              placeholder="Your email" 
              className='px-4 py-2 w-full rounded-l focus:outline-none bg-[var(--Treasureana---Geocaching-App-10)]'
            />
            <button className='bg-amber-600 text-white px-4 py-2 rounded-r hover:bg-amber-700 transition-colors'>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className='max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-400 text-center font-Funnel_Display text-[var(--Treasureana---Geocaching-App-8)]'>
        <p>© {new Date().getFullYear()} Ceylon Curry Club. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer