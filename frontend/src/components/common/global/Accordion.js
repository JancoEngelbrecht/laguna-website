import React, { useState } from 'react';

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full text-left py-4 px-6 flex justify-between items-center focus:outline-none"
        onClick={toggleAccordion}
      >
        <span className="text-xl font-medium">{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="p-6 bg-gray-100">
          {content}
        </div>
      )}
    </div>
  );
};

export default Accordion;