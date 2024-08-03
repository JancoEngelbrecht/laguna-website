import React, { useState, useEffect } from 'react';
import LogoImage from './logoImage';

const Logo = () => {
    // State to control the style of the logo (opacity and translation)
    const [style, setStyle] = useState({ opacity: 1, transform: 'translateY(0)' });

    useEffect(() => {
        // Function to handle scroll events and update logo style
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll = 100; // Adjust this value for smoother fade

            // Calculate opacity with a smoother transition
            const opacity = Math.max(1 - (scrollTop / maxScroll) ** 2, 0); // Using square for smoother fade-out

            // Calculate vertical translation based on scroll position
            const translateY = Math.min(scrollTop / 2, 100); // Adjust translation distance

            // Update the style state with calculated values
            setStyle({
                opacity: opacity,
                transform: `translateY(-${translateY}px)`
            });
        };

        // Attach scroll event listener
        window.addEventListener('scroll', handleScroll);
        // Call handleScroll initially to set the correct style on mount
        handleScroll();

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures this effect runs once on mount

    return (
        <div
            // Styling for the logo container
            className={`fixed top-0 left-[60px] w-[300px] h-[700px] bg-white border-b border-gray-300 shadow-logo transition-opacity duration-500 z-logo`}
            style={{
                opacity: style.opacity, // Apply calculated opacity
                transform: style.transform, // Apply calculated translation
                transition: 'opacity 0.3s ease-out, transform 0.3s ease' // Smooth transitions
            }}
        >
            <LogoImage />
            
            <div className="text-gray-800 text-left text-lg font-light mt-2 pl-10 pr-10 fixed bottom-20">
                {/* Laguna Butchery and contact details section */}
                <div className="">
                    <div className="mb-4">
                        {/* Butchery name and hours */}
                        <strong>Laguna Butchery</strong>
                        <p>Mon:   08:00 - 17:00 h</p>
                        <p>Tue:    08:00 - 17:00 h</p>
                        <p>Wed:   08:00 - 17:00 h</p>
                        <p>Thu:   08:00 - 17:00 h</p>
                        <p>Fri:   08:00 - 17:00 h</p>
                    </div>
                    <div className="border-t border-gray-200 pt-5 mt-5">
                        {/* Contact information */}
                        <a href='tel:+27 63 635 8992'>+27 63 635 8992</a>
                        <br />
                        <a href='https://www.google.com/maps/dir//Lemoenkloof+A+Piekenierskloof+pass,+Citrusdal,+7340,+South+Africa/@-32.6302585,18.8681874,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1c32e77cafda58cf:0x64b711fb54e50962!2m2!1d18.9505845!2d-32.6302699?entry=ttu'>
                            Lemoenkloof A Piekenierskloof Pass, <br /> Citrusdal, 7340, South Africa
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logo;