import React from "react";
import { NavLink } from "react-router-dom"


const UserNav = () => {
    return (
      <div className="flex justify-end items-center py-4 px-6 bg-gray-800 text-white pr-96">
        <div>
        <nav><NavLink to="user">Settings</NavLink></nav>
        <nav><NavLink to="user/about">About</NavLink></nav>
        </div>
    </div>
  );
};

export default UserNav;

