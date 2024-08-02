import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginButton from '../../../common/global/LoginButton';
import LogoutButton from '../../../common/global/LogoutButton';
import useClickOutside from './useClickOutside';

const DropdownMenu = ({ isAuthenticated, closeDropdown }) => {
  // Use the custom hook to get a ref and handle outside clicks
  const dropdownRef = useClickOutside(closeDropdown);

  return (
    <nav
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded"
    >
      {/* Navigation links */}
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
      
      {/* Authentication buttons */}
      <div
        className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
        onClick={closeDropdown}
        role="button"
        aria-label={isAuthenticated ? 'Log out' : 'Log in'}
      >
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>

      {/* Conditional Checkout link */}
      {isAuthenticated && (
        <NavLink
          to="/customer/checkout"
          className="block px-4 py-2 hover:bg-gray-200"
          onClick={closeDropdown}
        >
          Checkout
        </NavLink>
      )}
    </nav>
  );
};

export default DropdownMenu;