import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import LoginButton from "../../common/global/LoginButton";
import LogoutButton from "../../common/global/LogoutButton";
import { useRoles } from "../../../services/RoleProvider";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { isAuthenticated } = useAuth0();
  const { roles } = useRoles();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const isCustomer = roles.includes(undefined);

  return (
    <div className="py-4 px-6 bg-gray-800 text-white relative z-50">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div> 
        <div className="relative">
          <NavLink className="px-4">{isAuthenticated ? <LogoutButton /> : <LoginButton />}</NavLink>
          <button onClick={toggleDropdown} className="hover:text-gray-300 focus:outline-none"><FaBars /></button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded">
              <NavLink to="/" className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}>Home</NavLink>
              <NavLink to="/contact" className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}>Contact Us</NavLink>
              <NavLink to="/products" className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}>Products</NavLink>
              {isAuthenticated && (
                <NavLink to="/customer/checkout" className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}>Checkout</NavLink>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;