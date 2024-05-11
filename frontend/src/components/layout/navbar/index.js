import React from "react";
import { NavLink } from "react-router-dom"
import LoginButton from "../../common/LoginButton";


const Navbar = () => {
    return (
      <div className="py-4 px-6 bg-gray-800 text-white relative z-50">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div> 
        <div className="flex space-x-4">
          <NavLink to="/" className="hover:text-gray-300">Home</NavLink>
          <NavLink to="/contact" className="hover:text-gray-300">Contact Us</NavLink>
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar