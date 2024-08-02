import React from 'react';
import coverImage from '../../../assets/images/Image_Cover.jpg';

const HeroSection = ({ user }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={coverImage}
        alt="A stunning cover image showcasing meats perfection"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col md:grid md:grid-cols-2 items-center md:items-start justify-center md:justify-start px-4">
        <div className="hidden md:block"></div> {/* Empty div for layout */}
        <div className="w-full text-center md:text-left md:px-8 text-white flex flex-col justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold">
            Experience <br /> Meats <br /> Perfection
          </h1>
          {/* Optional Chaining for user.name*/}
          {user?.name && (
            <div className="mt-4 text-lg md:text-2xl">Welcome, {user.name}!</div>
          )} 
        </div>
      </div>
    </div>
  );
};

export default HeroSection;