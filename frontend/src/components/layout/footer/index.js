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
                <p className="text-sm">Mon to Fri :   08:00 - 17:00 h</p>
  
        </div>
        <div className="text-center mb-4 md:mb-0">
          <p className="text-lg font-bold">Address</p>
          <a className="text-sm" href='https://www.google.com/maps/dir//Lemoenkloof+A+Piekenierskloof+pass,+Citrusdal,+7340,+South+Africa/@-32.6302585,18.8681874,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1c32e77cafda58cf:0x64b711fb54e50962!2m2!1d18.9505845!2d-32.6302699?entry=ttu'>
                    Lemoenkloof A Piekenierskloof Pass, <br /> Citrusdal, 7340, South Africa
                </a>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">Contact</p>
          <a className="text-sm" href='tel:+27 63 635 8992'>tel: +27 63 635 8992</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;