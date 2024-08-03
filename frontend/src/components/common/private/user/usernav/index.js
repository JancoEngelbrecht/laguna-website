import React from "react";
import { NavLink } from "react-router-dom"
import LogoutButton from "../../../global/LogoutButton";


const UserNav = () => {
    return (
      <div className="py-4 px-6 bg-white text-black relative z-50">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Logo</div> 
          <div className="flex space-x-4">
            <NavLink to="user" className="hover:text-gray-300">Product Management</NavLink>
            <LogoutButton />
          </div>
        </div>
    </div>
  );
};

export default UserNav;

