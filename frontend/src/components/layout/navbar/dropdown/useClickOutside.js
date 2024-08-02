import { useEffect, useRef } from 'react';

/**
 * A custom hook to detect clicks outside of the referenced element.
 * @param {Function} callback - Function to call when a click outside is detected.
 * @returns {Object} - Ref object to attach to the element you want to monitor.
 */
const useClickOutside = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    // Handler to call the callback if click is outside the referenced element
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export default useClickOutside;