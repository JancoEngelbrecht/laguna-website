import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      onClick={handleScrollToTop}
      className="fixed bottom-6 right-6 bg-gray-950 text-white p-3 rounded-full shadow-lg cursor-pointer z-0"
    >
      <FaArrowUp />
    </div>
  );
};

export default ScrollToTop;