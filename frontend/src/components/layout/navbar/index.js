import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import LoginButton from "../../common/global/LoginButton";
import LogoutButton from "../../common/global/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../logo";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated } = useAuth0();
  const location = useLocation(); // Get the current location

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const isHomePage = location.pathname === "/"; // Check if the current path is the home page

  return (
    <div className="py-4 px-6 bg-white text-black relative z-50">
      <div className="flex items-center">
        {/* Logo section: only visible on the home page and not on small screens */}
        {isHomePage && (
          <div className="flex-shrink-0 mr-6 hidden sm:block">
            <Logo />
          </div>
        )}
        
        {/* Main content of the header */}
        <div className="flex-1 flex justify-end items-center">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="hover:text-gray-300 focus:outline-none"
            >
              <FaBars />
            </button>
            
            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded">
                <NavLink
                  to="/"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={closeDropdown}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/contact"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={closeDropdown}
                >
                  Contact Us
                </NavLink>
                <NavLink
                  to="/products"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={closeDropdown}
                >
                  Products
                </NavLink>

                <NavLink className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}>
                  {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                </NavLink>

                {isAuthenticated && (
                  <NavLink
                    to="/customer/checkout"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={closeDropdown}
                  >
                    Checkout
                  </NavLink>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;