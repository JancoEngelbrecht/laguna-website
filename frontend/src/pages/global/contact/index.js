import React from 'react';
import mainCow from "../../../assets/images/maincow.jpg";
import ContactForm from '../../../components/common/ContactForm';

const Contact = () => {
  return (
    <div className="flex justify-center items-center min-h-screen relative">
      {/* MainCow image */}
      <img className="absolute inset-0 w-screen h-screen object-cover z-0" src={mainCow} alt="Main Cow" />

      {/* Contact Form */}
      <div className="absolute left-72 z-10 bg-white p-8 rounded-lg shadow-lg">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;