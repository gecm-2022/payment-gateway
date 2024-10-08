import React from "react";
import { useAuth } from "../context/contextapi";
import { NavLink } from "react-router-dom";


const Navbar = () => {
  const { isLogin, logout } = useAuth();

  return (
    <nav className="bg-white  md:h-[15vh] shadow-md sticky top-0 z-10 w-[100vw] ">
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
          <a
            href="/"
            className="text-gray-700 hover:text-blue-500"
            aria-label="Home"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-gray-700 hover:text-blue-500"
            aria-label="About Us"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-gray-700 hover:text-blue-500"
            aria-label="Contact Us"
          >
            Contact
          </a>
        </div>
        {isLogin && (
          <div className="">
          <NavLink to={"/logout"}>
            
            <button type="button" >
              Logout
            </button>
          </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
