import React from 'react';
import coverimage from '../../../assets/images/Image_Cover.jpg';

const HeroSection = ({ user }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="relative bg-cover bg-center h-screen">
        <img src={coverimage} alt="Cover" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex md:grid md:grid-cols-2 items-center justify-center md:justify-start px-4">
          <div className="hidden md:block"></div> {/* Empty div for left column on medium and larger screens */}
          <div className="w-full text-center md:text-left md:px-8 text-white flex flex-col justify-center h-full">
            <h1 className="text-4xl md:text-6xl font-bold">
              Experience <br /> Meats <br /> Perfection
            </h1>
            {user && user.name && (
              <div className="mt-4 text-lg md:text-2xl">Welcome, {user.name}!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;