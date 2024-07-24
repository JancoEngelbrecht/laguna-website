import React, { useState, useEffect } from 'react';
import companylogo from "../../../assets/images/laguna_logo.png";

const Logo = () => {
    const [style, setStyle] = useState({ opacity: 1, transform: 'translateY(0)' });

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll = 200; // Adjust this value as needed

            // Calculate opacity and translate based on scroll position
            const opacity = Math.max(1 - scrollTop / maxScroll, 0);
            const translateY = Math.min(scrollTop / 2, 100); // Adjust translate distance

            setStyle({
                opacity: opacity,
                transform: `translateY(-${translateY}px)`
            });
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
    className={`fixed top-0 left-[60px] w-[300px] h-[700px] bg-white border-b border-gray-300 shadow-logo transition-opacity duration-500 z-logo`}
    style={{
        opacity: style.opacity,
        transform: style.transform,
        transition: 'opacity 0.5s ease-out, transform 0.3s ease'
    }}
>
    <img
        src={companylogo}
        alt="Company Logo"
        className="max-w-full max-h-[80%] object-contain"
    />
    
    <div className="text-gray-800 text-left text-lg font-light mt-2 pl-10 pr-10 fixed bottom-20">
        {/* Laguna Butchery and contact details */}
        <div className="">
            <div className="mb-4">
                <strong>Laguna Butchery</strong>
                <p>Mon to Fri: 08 - 18 h</p>
                <p>Saturday: 08 - 12 h</p>
            </div>
            <div className="border-t border-gray-200 pt-5 mt-5">
                <a href='tel:+27 63 635 8992'>+27 63 635 8992</a>
                <br />
                <a href='https://www.google.com/maps/dir//Lemoenkloof+A+Piekenierskloof+pass,+Citrusdal,+7340,+South+Africa/@-32.6302585,18.8681874,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1c32e77cafda58cf:0x64b711fb54e50962!2m2!1d18.9505845!2d-32.6302699?entry=ttu'>
                    Piekenierskloof Pass, <br /> Citrusdal, 7340, South Africa
                </a>
            </div>
        </div>
    </div>
</div>
    );
};

export default Logo;