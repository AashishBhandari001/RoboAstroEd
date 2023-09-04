import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";

function Header() {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <header>
      <div
        className={`bg-white text-black font-open-sans md:mr-10 md:ml-10 relative ${
          isOpen ? "h-screen" : ""
        }`}
      >
        <div>
          <nav className="container flex flex-col md:flex-row justify-between items-center">
            {!isOpen && (
              <div className="text-xs">
                <div className="flex items-center">
                  <div className="md:mx-4">
                    <img
                      src={logo}
                      className="w-12 h-12 pt-2 "
                      alt="Company Logo"
                    />
                  </div>

                  <Link
                    to="/Home"
                    className="no-underline hover:text-color-[#FF4F1D]"
                  >
                    <div className="text-black font-bold">RoboAstroEd</div>
                  </Link>
                </div>
              </div>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden absolute right-8 top-4 ">
              <Hamburger toggled={isOpen} toggle={toggleMenu} />
            </div>

            {/* Navigation Links (Hidden on md screens when hamburger is closed) */}
            <ul
              className={`md:hidden ${
                isOpen ? "block" : "hidden"
              } mt-4 md:text-left list-none`}
            >
              <li>
                <Link
                  to="/Home"
                  className="block no-underline text-black hover:text-color-[#FF4F1D] mb-2"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Products"
                  className="block no-underline text-black hover:text-color-[#FF4F1D] mb-2"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/Lessons"
                  className="block no-underline text-black hover:text-color-[#FF4F1D] mb-2"
                >
                  Lessons
                </Link>
              </li>
              <li>
                <Link
                  to="/Cart"
                  className="block no-underline text-black hover:text-color-[#FF4F1D] mb-2"
                >
                  Cart
                </Link>
              </li>
              <li>
                <button className="block bg-[#B0F0F6] px-1 py-1 rounded-md hover:text-color-[#FF4F1D] border-transparent hover:opacity-80 ease-in duration-200">
                  Account
                </button>
              </li>
            </ul>

            {/* Navigation Links (Displayed on md screens) */}
            <ul className="hidden md:flex list-none space-x-6">
              <li>
                <Link
                  to="/Home"
                  className="no-underline text-black hover:text-color-[#FF4F1D]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Products"
                  className="no-underline text-black hover:text-color-[#FF4F1D]"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/Lessons"
                  className="no-underline text-black hover:text-color-[#FF4F1D]"
                >
                  Lessons
                </Link>
              </li>
              <li>
                <Link
                  to="/Cart"
                  className="no-underline text-black hover:text-color-[#FF4F1D]"
                >
                  Cart
                </Link>
              </li>
              <li>
              <button className="bg-[#B0F0F6] px-2 py-1 rounded-md hover:text-color-[#FF4F1D] border-transparent hover:opacity-80 ease-in duration-200">
                  Account
                </button>
              </li>
            </ul>
          </nav>
          {/* Conditional rendering for border */}
          {!isOpen && (
            <div className="flex items-stretch bg-[#B0F0F6] border-8  border-transparent border-solid"></div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
