import React, {useState} from "react";
import { NavLink } from "react-router-dom"
import { FaBars} from "react-icons/fa";
import LoginButton from "../../common/global/LoginButton";


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

    return (
      <div className="py-4 px-6 bg-gray-800 text-white relative z-50">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div> 
        <div className="relative">
          <button onClick={toggleDropdown} className="hover:text-gray-300 focus:outline-none"><FaBars /></button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded">
              <NavLink to="/" className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}>Home</NavLink>
              <NavLink to="/contact" className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}>Contact Us</NavLink>
              <NavLink to="/products" className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}>Products</NavLink>
              <NavLink to="/checkout" className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}>Checkout</NavLink>
              <NavLink className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}><LoginButton /></NavLink>
            </div>)
          }
          
        </div>
      </div>
    </div>
  );
};

export default Navbar