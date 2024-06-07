import React from 'react';
import mainCow from "../../../assets/images/maincow.jpg";
import ContactForm from '../../../components/common/global/ContactForm';
import LocationMap from '../../../components/common/global/LocationMap';

const Contact = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${mainCow})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay for better contrast */}
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Contact Form */}
          <div className="w-full md:w-1/2 p-4">
            <ContactForm />
          </div>

          {/* Location Map */}
          <div className="w-full md:w-1/2 p-4 md:pl-0">
            <div className="h-64 md:h-full flex-grow">
              <LocationMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;