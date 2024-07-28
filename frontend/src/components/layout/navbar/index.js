import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../logo";
import DropdownMenu from "./DropdownMenu";
import laguna from "./../../../assets/images/LagunaLogo_invert.png"

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const isHomePage = location.pathname === "/";

  return (
    <div className="py-4 px-6 bg-white text-black relative z-50">
      <div className="flex items-center justify-between">
        {/* Small screen logo */}
        <div className="top-16 absolute flex-shrink-0 sm:hidden">
          <img src={laguna} className="w-36 h-auto"></img>
        </div>
        {/* Home page logo for larger screens */}
        {isHomePage && (
          <div className="flex-shrink-0 mr-6 hidden sm:block">
            <Logo />
          </div>
        )}
        <div className="flex-1 flex justify-end items-center">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="hover:text-gray-300 focus:outline-none"
            >
              <FaBars />
            </button>
            {dropdownOpen && (
              <DropdownMenu
                isAuthenticated={isAuthenticated}
                closeDropdown={closeDropdown}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;