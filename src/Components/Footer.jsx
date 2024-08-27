import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use react-router-dom for navigation

const Footer = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="flex sticky w-[100vw] h-[15vh] bottom-0 flex-row justify-around bg-sky-600 text-white gap-2 py-5">
            <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleNavigation('/')}
            >
                <img src='/f1.png' alt='Help icon' height={40} width={40} className="object-contain" />
                <p className="mt-2">Help</p>
            </div>
            <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleNavigation('/product')}
            >
                <img src='/f2.png' alt='App icon' height={40} width={40} className="object-contain" />
                <p className="mt-2">App</p>
            </div>
            <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleNavigation('/login')}
            >
                <img src='/f3.png' alt='Services icon' height={40} width={40} className="object-contain" />
                <p className="mt-2">Services</p>
            </div>
        </div>
    );
};

export default Footer;
