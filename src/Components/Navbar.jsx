import React, { useContext, useState } from 'react';
import Logo from '../assets/Images/Logo.png';
import { Menu, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/authContext'; // adjust if needed

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--Treasureana---Geocaching-App-7)] shadow-md">
      <div className="px-5 h-[5rem] flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="h-28" />
        </div>
        </Link>
        {/* Navigation Links */}
        <ul className="flex items-center gap-8 text-[var(--Treasureana---Geocaching-App-4)] font-Funnel_Display group">
          <Link to="/menu">
            <li className="cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out hover:font-Funnel_Display_SemiBold">
              Menu
            </li>
          </Link>
          <Link to="/our-story">
            <li className="cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out hover:font-Funnel_Display_SemiBold">
              Our Story
            </li>
          </Link>
          <li className="cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out hover:font-Funnel_Display_SemiBold">
            About Us
          </li>
          <li className="cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out hover:font-Funnel_Display_SemiBold">
            Contact
          </li>
          <Link to="/reservation">
            <li className="cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out hover:font-Funnel_Display_SemiBold">
              Reservation
            </li>
          </Link>
        </ul>

        {/* Right section */}
        <div className="hidden md:flex relative">
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--Treasureana---Geocaching-App-4)] text-[var(--Treasureana---Geocaching-App-7)]"
              >
                <User className="w-5 h-5" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-[10rem] font-Funnel_Display bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-[var(--Treasureana---Geocaching-App-4)] w-[8rem] cursor-pointer text-[var(--Treasureana---Geocaching-App-7)] font-semibold px-8 py-2 transition">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden">
          <Menu className="text-[var(--Treasureana---Geocaching-App-4)] w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
