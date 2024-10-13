import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const PrivacyConsentBanner = () => {
  const { isAuthenticated } = useAuth0();
  const [isVisible, setIsVisible] = useState(() => {
    // Get the initial state from localStorage
    const consentBannerClosed = localStorage.getItem('consentBannerClosed');
    return !consentBannerClosed;
  });

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('consentBannerClosed', 'true');
  };

  if (isAuthenticated) return null;

  return (
    isVisible && (
      <div className="fixed bottom-0 w-full bg-black bg-opacity-50 text-white p-4 flex justify-between items-center z-40">
        <div className="text-sm">
          By signing up, you consent to the collection and processing of your email and phone number for account creation and management, as well as for website analytics and improvements. Your data will not be sold to external providers, and you can at any time request the termination of data. <a href="/privacy" className="underline">Read our Privacy Policy for more information.</a>
        </div>
        <button onClick={handleClose} className="text-white text-xl">&times;</button>
      </div>
    )
  );
};

export default PrivacyConsentBanner;