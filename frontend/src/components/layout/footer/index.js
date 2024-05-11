import React from "react";


const Footer = () => {
    return (
      <div className="bg-gray-800 text-white py-4 relative w-full inset-x-0 bottom-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <p className="text-xl font-bold">Your Company Name</p>
          <p className="text-sm">123 Street Name, City, Country</p>
          <p className="text-sm">info@company.com</p>
          <p className="text-sm">123-456-7890</p>
        </div>
      </div>
    </div>
  );
};

export default Footer