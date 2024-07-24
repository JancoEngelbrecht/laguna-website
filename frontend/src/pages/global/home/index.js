import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import coverimage from "../../../assets/images/Image_Cover.jpg"; // Ensure this path is correct
import mainCow from "../../../assets/images/maincow.jpg";
import Accordion from './../../../components/common/global/Accordion';
import ScrollToTop from './../../../components/common/global/ScrollToTop';
import { FaArrowUp } from 'react-icons/fa'; // Ensure you have react-icons installed


const Home = () => {
  const { user } = useAuth0();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <div className="parallax bg-cover bg-center h-screen" style={{ position: 'relative', overflow: 'hidden' }}>
          <img src={coverimage} alt="Cover" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-center">Welcome to Our Website</h1>
            {user && user.name && (
              <div className="mt-4 text-lg md:text-2xl text-center">Welcome, {user.name}!</div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-gray-100 py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
         
        </div>
      </section>

      {/* Accordion Section */}
      <div className="relative bg-white py-8 md:py-12">
        
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop className="fixed bottom-6 right-6 bg-gray-950 text-white p-3 rounded-full shadow-lg cursor-pointer">
        <FaArrowUp />
      </ScrollToTop>
    </div>
  );
};

export default Home;