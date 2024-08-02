import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";

import Logo from "../logo";
import DropdownMenu from "./dropdown/index";
import laguna from "./../../../assets/images/LagunaLogo_invert.png"

const Navbar = () => {
  // State to manage the dropdown menu's open/closed state
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Authentication and roles from Auth0
  const { isAuthenticated } = useAuth0();
  
  // Current location path from React Router
  const location = useLocation();
  
  // Determine if the current page is the home page
  const isHomePage = location.pathname === "/";

  // Toggle the dropdown menu open/closed state
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  // Close the dropdown menu
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <header className="py-4 px-6 bg-white text-black relative z-50">
      {/* Container for the navbar elements */}
      <div className="flex items-center justify-between">
        
        {/* Small screen logo */}
        {isHomePage && (
          <div className="top-16 absolute flex-shrink-0 sm:hidden">
            {/* Image logo for small screens */}
            <img src={laguna} className="w-36 h-auto" alt="Laguna Logo" />
          </div>
        )}
        
        {/* Home page logo for larger screens */}
        {isHomePage && (
          <div className="flex-shrink-0 mr-6 hidden sm:block">
            {/* Component logo for larger screens */}
            <Logo />
          </div>
        )}
        
        {/* Navbar items and dropdown menu */}
        <div className="flex-1 flex justify-end items-center">
          <div className="relative">
            {/* Button to toggle the dropdown menu */}
            <button
              onClick={toggleDropdown}
              className="hover:text-gray-300 focus:outline-none"
              aria-expanded={dropdownOpen}
              aria-controls="dropdown-menu"
            >
              <FaBars />
            </button>
            
            {/* Dropdown menu that appears when open */}
            {dropdownOpen && (
              <DropdownMenu
                isAuthenticated={isAuthenticated}
                closeDropdown={closeDropdown}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;