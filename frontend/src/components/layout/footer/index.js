import React from "react";
import companylogo from "../../../assets/images/laguna_logo.png";

const Footer = () => {
  return (
    <div className="bg-white text-black py-4 relative w-full inset-x-0 bottom-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={companylogo} alt="Laguna Slaghuis" className="h-52" /> {/* Adjust the path to your logo */}
        </div>
        <div className="text-center mb-4 md:mb-0">
          <p className="text-lg font-bold">Open Hours</p>
          <p className="text-sm">Monday to Friday: 08 to 18h</p>
          <p className="text-sm">Saturday: 08 to 12h</p>
        </div>
        <div className="text-center mb-4 md:mb-0">
          <p className="text-lg font-bold">Address</p>
          <p className="text-sm">Lemoenkloof</p>
          <p className="text-sm">Citrusdal</p>
          <p className="text-sm">South Africa</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">Contact</p>
          <p className="text-sm">+27 84 200 5625</p>
          <p className="text-sm">laguna@buchery.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;