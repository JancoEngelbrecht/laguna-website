import React from 'react';
import HangMeat from '../../../assets/images/HangMeat.png';

const HuntingSection = () => {
  return (
    <section id="hunting-section" className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 md:p-8">
      <div className="order-1 md:order-2 relative flex justify-center items-center">
        <div className="swing w-2/3 md:w-2/3 h-auto md:h-auto relative z-40">
          <img src={HangMeat} className="" />
        </div>
        <div className="swing w-2/3 md:w-2/3 h-auto md:h-auto absolute z-30">
          <img src={HangMeat} className="" />
        </div>
        <div className="swing w-2/3 md:w-2/3 h-auto md:h-auto absolute z-20">
          <img src={HangMeat} className="" />
        </div>
      </div>
      <div className="order-2 md:order-1 relative bg-black flex flex-col justify-center items-center p-4 md:p-8">
        <div className="container max-w-md text-white p-8 z-10">
          <h2 className="text-3xl md:text-5xl font-bold tracking-wide">FOR HUNTERS</h2>
          <p className="mt-4 text-lg md:text-2xl text-justify leading-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HuntingSection;