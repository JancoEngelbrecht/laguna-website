import React from 'react';
import steakImage from '../../../assets/images/steak.png';
import rosemary1 from '../../../assets/images/rosemary1.png';

const SteakSection = () => {
  return (
    <section id="steak-section" className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 md:p-8">
      <div className="relative flex justify-center items-center">
        <img id="rosemary1" src={rosemary1} alt="Rosemary 1" className="absolute w-4/5 md:w-7/12 h-auto opacity-0 animate-slide-out" />
        <img src={steakImage} alt="Steak" className="object-cover w-full md:w-auto h-auto md:h-4/6 relative z-10" />
      </div>
      <div className="flex flex-col justify-center items-start p-4 md:p-8">
        <div className="max-w-md text-black">
          <h2 className="text-3xl md:text-5xl font-bold tracking-wide">OUR DELICIOUS MEATS</h2>
          <p className="mt-4 text-lg md:text-2xl text-justify leading-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SteakSection;