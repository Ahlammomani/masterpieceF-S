import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import { useCookies } from 'react-cookie';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user cookie exists on component mount
    setIsUserLoggedIn(!!cookies.userId);
  }, [cookies.userId]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown-container')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await fetch('/users/logout', {
        method: 'POST',
        credentials: 'include', // important to send cookies
      });

      removeCookie('token', { path: '/' });
      removeCookie('userId', { path: '/' });

      setIsUserLoggedIn(false);
      setIsProfileDropdownOpen(false);
      navigate('/');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Close mobile menu when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-[#FCF8F3] border-b border-[#FF8BA7] shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 md:p-4">
        {/* Logo Section - More responsive sizing */}
        <Link to="/" className="flex items-center space-x-2 md:space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-12 md:h-16 lg:h-20 transition-all" alt="Logo" />
          <span className="self-center text-lg md:text-xl lg:text-2xl font-semibold whitespace-nowrap text-[#97BE5A]">FruitandSeeds</span>
        </Link>
        
        {/* User Profile / Join Us Button Section */}
        <div className="flex items-center md:order-2 space-x-2 md:space-x-4">
          {isUserLoggedIn ? (
            <div className="relative profile-dropdown-container">
              <button 
                type="button" 
                className="flex text-sm bg-[#C1CFA1] rounded-full focus:ring-2 focus:ring-[#97BE5A] transition-all" 
                onClick={toggleProfileDropdown}
                aria-expanded={isProfileDropdownOpen}
              >
                <span className="sr-only">Open user menu</span>
                <FaUser className="w-7 h-7 md:w-8 md:h-8 p-1.5 text-[#FDFAF6]" />
              </button>
              
              {/* Dropdown menu - Improved positioning */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 bg-[#FDFAF6] rounded-lg shadow-lg divide-y divide-[#FF8BA7] transform origin-top-right transition-transform duration-200 ease-out">
                  <div className="px-4 py-3">
                    <span className="block text-sm font-medium text-[#97BE5A]">
                      {cookies.user?.firstName || 'User'}
                    </span>
                    <span className="block text-sm text-[#97BE5A] truncate">
                      {cookies.user?.email || ''}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-[#97BE5A] hover:bg-[#FF8BA7] hover:text-[#FDFAF6] transition-colors duration-200" 
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/order-confirmation" 
                        className="block px-4 py-2 text-sm text-[#97BE5A] hover:bg-[#FF8BA7] hover:text-[#FDFAF6] transition-colors duration-200" 
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <button 
                        onClick={handleLogout} 
                        className="block w-full text-left px-4 py-2 text-sm text-[#97BE5A] hover:bg-[#FF8BA7] hover:text-[#FDFAF6] transition-colors duration-200"
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/signup"
              className="bg-[#97BE5A] hover:bg-[#FF8BA7] text-[#FDFAF6] font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 text-center transition-colors duration-200"
            >
              Join Us
            </Link>
          )}
          
          {/* Hamburger Menu Button with smoother transition */}
          <button
            type="button"
            className="inline-flex items-center p-1.5 md:p-2 w-8 h-8 md:w-10 md:h-10 justify-center text-[#97BE5A] rounded-lg md:hidden hover:bg-[#FF8BA7] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#C1CFA1] ml-1 md:ml-2 transition-colors duration-200"
            onClick={toggleMenu}
            aria-controls="navbar-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        
        {/* Navigation Links with improved mobile experience */}
        <div 
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'} md:block transition-all duration-300 ease-in-out`} 
          id="navbar-menu"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-[#FF8BA7] rounded-lg bg-[#FDFAF6] md:flex-row md:space-x-4 lg:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link 
                to="/" 
                className="block py-2 px-3 text-[#97BE5A] bg-[#C1CFA1] rounded-lg md:bg-transparent md:text-[#97BE5A] md:font-bold md:p-0 md:hover:text-[#FF8BA7] transition-colors duration-200" 
                aria-current="page"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/menu" 
                className="block py-2 px-3 text-[#97BE5A] rounded-lg hover:bg-[#FF8BA7] hover:text-white md:hover:bg-transparent md:hover:text-[#FF8BA7] md:p-0 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
            </li>
            <li>
              <Link 
                to="/aboutus" 
                className="block py-2 px-3 text-[#97BE5A] rounded-lg hover:bg-[#FF8BA7] hover:text-white md:hover:bg-transparent md:hover:text-[#FF8BA7] md:p-0 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </Link>
            </li>
            <li>
              <Link 
                to="/contactus" 
                className="block py-2 px-3 text-[#97BE5A] rounded-lg hover:bg-[#FF8BA7] hover:text-white md:hover:bg-transparent md:hover:text-[#FF8BA7] md:p-0 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;