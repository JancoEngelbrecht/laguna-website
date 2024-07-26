import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import coverimage from "../../../assets/images/Image_Cover.jpg";
import steakImage from "../../../assets/images/steak.png";
import rosemary1 from "../../../assets/images/rosemary1.png";
import HangMeat from "../../../assets/images/HangMeat.png";
import ScrollToTop from './../../../components/common/global/ScrollToTop';
import { FaArrowUp } from 'react-icons/fa';

const Home = () => {
  const { user } = useAuth0();

  useEffect(() => {
    const handleScroll = () => {
      const rosemary1Element = document.getElementById('rosemary1');
      const steakSection = document.getElementById('steak-section');
      const hangMeatImages = document.querySelectorAll('.hang-meat');

      // STEAK SECTION
      if (steakSection) {
        const sectionTop = steakSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight) {
          rosemary1Element.classList.add('animate-slide-out');
        } else {
          rosemary1Element.classList.remove('animate-slide-out');
        }
      }

      // HANGED MEAT SECTION
      hangMeatImages.forEach(image => {
        const rect = image.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom >= 0) {
          if (image.classList.contains('z-40')) {
            image.classList.add('animate-swing');
          } else if (image.classList.contains('z-30')) {
            image.classList.add('animate-swingReverse');
          } else if (image.classList.contains('z-20')) {
            image.classList.add('animate-swingFast');
          }
        } else {
          image.classList.remove('animate-swing', 'animate-swingReverse', 'animate-swingFast');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function useScreenWidth() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      function handleResize() {
        setScreenWidth(window.innerWidth);
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return screenWidth;
  }

  const screenWidth = useScreenWidth()
  const isBigScreen = screenWidth >= 768;

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <div className="relative bg-cover bg-center h-screen">
          <img src={coverimage} alt="Cover" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-center">Experiance Meats Perfection</h1>
            {user && user.name && (
              <div className="mt-4 text-lg md:text-2xl text-center">Welcome, {user.name}!</div>
            )}
          </div>
        </div>
      </div>

      {/* Steak Section */}
      <section id="steak-section" className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 md:p-8">
        {/* Steak Image Container */}
        <div className="relative flex justify-center items-center">
          <img id="rosemary1" src={rosemary1} alt="Rosemary 1" className="absolute w-4/5 md:w-7/12 h-auto opacity-0 animate-slide-out" />
          <img src={steakImage} alt="Steak" className="object-cover w-full md:w-auto h-auto md:h-4/6 relative z-10" />
        </div>

        {/* Text Content Container */}
        <div className="flex flex-col justify-center items-start p-4 md:p-8">
          <div className="max-w-md text-gray-700">
            <h2 className="text-3xl md:text-5xl font-bold tracking-wide">OUR DELICIOUS MEATS</h2>
            <p className="mt-4 text-lg md:text-2xl text-justify leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </section>

      {/* Hunting Section */}
      {screenWidth >= 1440 && (
      <section id="hunting-section" className="relative flex items-start p-8 md:pb-32">
        {/* Banner */}
        <div className="relative bg-gray-900 w-9/12 h-auto flex items-center justify-left pl-48">
          {/* Text Content Container */}
          <div className="container max-w-md text-white pt-48 pb-48 z-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-wide">FOR HUNTERS</h2>
            <p className="mt-4 text-lg md:text-2xl text-justify leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
          {/* Hanged Meat Container */}
            <><div className="container absolute w-96 h-96 bottom-10 right-80 flex items-center justify-center">
              <img src={HangMeat} className="hang-meat w-3/5 md:w-auto h-auto md:w-12/12 relative z-40 transform-origin-top" />
            </div>
            <div className="absolute w-96 h-96 bottom-20 right-60 flex items-center justify-center">
              <img src={HangMeat} className="hang-meat w-3/5 md:w-auto h-auto md:w-12/12 relative z-30 transform-origin-top" />
            </div>
            <div className="absolute w-96 h-96 bottom-32 right-40 flex items-center justify-center">
              <img src={HangMeat} className="hang-meat w-3/5 md:w-auto h-auto md:w-12/12 relative z-20 transform-origin-top" />
            </div>
            </>
      </section>
    )}

    {/* Hunting Section */}
    {screenWidth >= 800 && screenWidth <= 1024 && (
      <section id="hunting-section" className="relative flex items-start p-8 md:pb-32">
        {/* Banner */}
        <div className="relative bg-gray-900 w-9/12 h-auto flex items-center justify-left pl-48">
          {/* Text Content Container */}
          <div className="container max-w-md text-white pt-48 pb-48 z-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-wide">FOR HUNTERS</h2>
            <p className="mt-4 text-lg md:text-2xl text-justify leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
          {/* Hanged Meat Container */}
            <><div className="container absolute w-96 h-96 bottom-10 right-20 flex items-center justify-center">
              <img src={HangMeat} className="hang-meat w-3/5 md:w-auto h-auto md:w-12/12 relative z-40 transform-origin-top" />
            </div>
            <div className="absolute w-96 h-96 bottom-20 right-10 flex items-center justify-center">
              <img src={HangMeat} className="hang-meat w-3/5 md:w-auto h-auto md:w-12/12 relative z-30 transform-origin-top" />
            </div>
            <div className="absolute w-96 h-96 bottom-32 right-0 flex items-center justify-center">
              <img src={HangMeat} className="hang-meat w-3/5 md:w-auto h-auto md:w-12/12 relative z-20 transform-origin-top" />
            </div>
            </>
      </section>
    )}

   {/* Hunting Section */}
{screenWidth > 500 && screenWidth < 800 && (
  <section id="hunting-section" className="grid grid-cols-2 p-8">
    {/* Banner */}
    <div className=" bg-gray-900 h-auto items-center justify-left ">
      {/* Text Content Container */}
      <div className="container text-white pt-12 pb-12 pl-8 pr-8 z-10">
        <h2 className="text-3xl md:text-5xl font-bold tracking-wide">FOR HUNTERS</h2>
        <p className="mt-4 text-lg md:text-2xl text-justify leading-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>

   {/* Hanged Meat Container */}
<div className="relative flex flex-col items-center justify-center">
  <div className="w-auto flex items-center justify-center">
    <img src={HangMeat} className="hang-meat w-3/5 h-auto absolute z-40 left-0 top-40" />
  </div>
  <div className="w-auto flex items-center justify-center">
    <img src={HangMeat} className="hang-meat w-3/5 h-auto absolute z-30 left-8 top-30" />
  </div>
  <div className="w-auto flex items-center justify-center">
    <img src={HangMeat} className="hang-meat w-3/5 h-auto absolute z-20 left-16 top-20" />
  </div>
</div>
</section>
)}

     {/* Hunting Section for small screens */}
  {screenWidth < 500 && (
    <section id="hunting-section" className="relative flex flex-col items-center p-4 ">
        <div className="relative w-64 h-64 mb-8">
        <img src={HangMeat} className="absolute hang-meat w-3/4 h-auto z-40 top-4 left-0 transform-origin-top" />
        <img src={HangMeat} className="absolute hang-meat w-3/4 h-auto md:w-auto lg:w-full z-30 top-2 left-10 transform-origin-top" />
        <img src={HangMeat} className="absolute hang-meat w-3/4 h-auto z-20 top-0 left-20 transform-origin-top" />
      </div>

          {/* Banner */}
          <div className="relative bg-gray-900 w-full h-auto flex flex-col items-start p-4 md:p-8 ">
        {/* Text Content Container */}
        <div className="container max-w-md text-white pt-12 pb-12  z-10">
          <h2 className="text-2xl  font-bold tracking-wide">FOR HUNTERS</h2>
          <p className="mt-2 text-base text-justify leading-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
)}
    
      {/* Scroll to Top Button */}
      <ScrollToTop className="fixed bottom-6 right-6 bg-gray-950 text-white p-3 rounded-full shadow-lg cursor-pointer">
        <FaArrowUp />
      </ScrollToTop>
    </div>
  );
};

export default Home;