import React from "react";
import { NavLink } from 'react-router-dom';
import LogoImage from "../logo/logoImage";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-4 relative w-full bottom-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-top justify-between px-24">
        {/* Logo Section */}
        <div className="flex items-center mb-4 md:mb-0">
          <LogoImage className="w-auto h-52"/>
        </div>
        {/* Open Hours Section */}
        <div className="mb-4 mt-12 md:mb-0 ">
          <p className="text-lg font-bold">Open Hours</p>
          <p className="text-sm">Mon to Fri: 08:00 - 17:00</p>
        </div>
        {/* Address Section */}
        <div className=" mb-4 mt-12 md:mb-0">
          <p className="text-lg font-bold">Address</p>
          <a
            className="text-sm"
            href='https://www.google.com/maps/dir//Lemoenkloof+A+Piekenierskloof+pass,+Citrusdal,+7340,+South+Africa/@-32.6302585,18.8681874,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1c32e77cafda58cf:0x64b711fb54e50962!2m2!1d18.9505845!2d-32.6302699?entry=ttu'
            target="_blank"
            rel="noopener noreferrer"
            // Opens the link in a new tab and improves security
          >
            Lemoenkloof A Piekenierskloof Pass,<br /> Citrusdal, 7340, South Africa
          </a>
        </div>
        {/* Contact Section */}
        <div className="mt-12">
          <p className="text-lg font-bold">Contact</p>
          <a
            className="text-sm"
            href='tel:+27636358992'
          >
            +27 63 635 8992
          </a>
        </div>
        {/* Open Hours Section */}
        <div className="mb-4 mt-12 md:mb-0">
          <p className="text-lg font-bold">Legal</p>
          <p className="text-sm">
            <NavLink
              to="/privacy"
              className="text-sm">
              Privacy Policy
            </NavLink></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;