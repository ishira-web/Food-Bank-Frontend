import React, { useContext, useState, useRef, useEffect } from 'react';
import Logo from '../assets/Images/Logo.png';
import { Menu, User, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/authContext';
import gsap from 'gsap';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const mobileMenuRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  // GSAP animations for mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { x: '100%', opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          x: '100%',
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in'
        });
      }
    }
  }, [mobileMenuOpen]);

  // GSAP animation for mobile dropdown
  useEffect(() => {
    if (mobileDropdownRef.current) {
      if (dropdownOpen) {
        gsap.fromTo(
          mobileDropdownRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.3 }
        );
      } else {
        gsap.to(mobileDropdownRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.2
        });
      }
    }
  }, [dropdownOpen]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Reset dropdown when mobile menu closes
    if (mobileMenuOpen) setDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  // Close mobile menu when clicking on links
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--Treasureana---Geocaching-App-7)] shadow-md">
        <div className="px-5 h-[5rem] flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="Logo" className="h-28" />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-8 text-[var(--Treasureana---Geocaching-App-4)] font-Funnel_Display group">
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

          {/* Desktop Profile/Login */}
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              {mobileMenuOpen ? (
                <X className="text-[var(--Treasureana---Geocaching-App-4)] w-6 h-6" />
              ) : (
                <Menu className="text-[var(--Treasureana---Geocaching-App-4)] w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Mobile Menu Panel */}
      <div 
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl md:hidden transform translate-x-full"
      >
        <div className="p-5 h-full flex flex-col">
          <div className="flex justify-end mb-8">
            <button onClick={toggleMobileMenu}>
              <X className="text-gray-700 w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <ul className="flex flex-col gap-6 text-gray-700 font-Funnel_Display">
            <Link to="/" onClick={closeMobileMenu}>
              <li className="cursor-pointer py-2 border-b border-gray-100 hover:font-Funnel_Display_SemiBold">
                Home
              </li>
            </Link>
            <Link to="/menu" onClick={closeMobileMenu}>
              <li className="cursor-pointer py-2 border-b border-gray-100 hover:font-Funnel_Display_SemiBold">
                Menu
              </li>
            </Link>
            <Link to="/our-story" onClick={closeMobileMenu}>
              <li className="cursor-pointer py-2 border-b border-gray-100 hover:font-Funnel_Display_SemiBold">
                Our Story
              </li>
            </Link>
            <li className="cursor-pointer py-2 border-b border-gray-100 hover:font-Funnel_Display_SemiBold">
              About Us
            </li>
            <li className="cursor-pointer py-2 border-b border-gray-100 hover:font-Funnel_Display_SemiBold">
              Contact
            </li>
            <Link to="/reservation" onClick={closeMobileMenu}>
              <li className="cursor-pointer py-2 border-b border-gray-100 hover:font-Funnel_Display_SemiBold">
                Reservation
              </li>
            </Link>
          </ul>

          {/* Mobile Profile/Login Section */}
          <div className="mt-auto py-8 border-t border-gray-200">
            {user ? (
              <div className="w-full">
                <button
                  onClick={toggleDropdown}
                  className="w-full flex items-center justify-between py-3 px-4 bg-gray-100 rounded-lg"
                >
                  <span className="font-Funnel_Display">My Account</span>
                  <User className="w-5 h-5" />
                </button>

                {/* Mobile Dropdown */}
                <div 
                  ref={mobileDropdownRef}
                  className="overflow-hidden"
                  style={{ height: 0, opacity: 0 }}
                >
                  <div className="mt-2 space-y-2">
                    <Link
                      to="/profile"
                      className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
                      onClick={closeMobileMenu}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 px-4 text-red-600 hover:bg-gray-100 rounded"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" onClick={closeMobileMenu} className="block w-full">
                <button className="w-full bg-[var(--Treasureana---Geocaching-App-4)] text-white font-semibold py-3 px-4 rounded-lg">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;