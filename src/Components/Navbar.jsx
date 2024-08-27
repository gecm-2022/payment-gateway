import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-10 w-[100vw] " >
      <div className="container mx-auto flex items-center justify-between p-4">
        <img
          src="/logo.png" // Path to the image in the public directory
          alt="Logo"
          width={120}
          height={50}
          className="h-auto"
        />
        <div className="flex space-x-4">
          {/* Example links */}
          <a href="/" className="text-gray-700 hover:text-blue-500" aria-label="Home">Home</a>
          <a href="/about" className="text-gray-700 hover:text-blue-500" aria-label="About Us">About</a>
          <a href="/contact" className="text-gray-700 hover:text-blue-500" aria-label="Contact Us">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
