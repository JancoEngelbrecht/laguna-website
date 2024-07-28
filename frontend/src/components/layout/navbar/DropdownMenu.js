import React from "react";
import { NavLink } from "react-router-dom";
import LoginButton from "../../common/global/LoginButton";
import LogoutButton from "../../common/global/LogoutButton";

const DropdownMenu = ({ isAuthenticated, closeDropdown }) => {
  return (
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
      <div className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
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
  );
};

export default DropdownMenu;