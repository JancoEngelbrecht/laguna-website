import React from "react";
import { Link } from "react-router-dom"


const Navbar = () => {
    return (
      <div className="flex justify-end items-center py-4 px-6 bg-gray-800 text-white pr-96">
      <div>
        <Link to="/" className="text-lg font-bold mr-4">Home</Link>
        <Link to="/about" className="text-lg font-bold"> About</Link>
        <Link to="/login" className="text-lg font-bold"> Login</Link>
      </div>
    </div>
  );
};

export default Navbar