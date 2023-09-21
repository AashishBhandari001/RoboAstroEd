import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between font-open-sans list-none no-underline md:mr-8 md:ml-8 p-4">
        <li>
          <Link
            to="/Home"
            className="flex items-center text-black no-underline hover:text-color-[#FF4F1D]"
          >
            <img src={logo} className="h-16 mr-3" alt="Flowbite Logo" />
            <div className="text-black font-bold">RoboAstroEd</div>
          </Link>
        </li>
        <button
          onClick={toggleNav}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm md:hidden focus:outline-none focus:ring-2"
          aria-controls="navbar-default"
          aria-expanded={isNavOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isNavOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 no-underline list-none md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link
                to="/Home"
                className="block py-2 pl-3 pr-4 text-black bg-[#B0F0F6] md:bg-transparent md:text-black md:hover:text-[#FF4F1D] md:p-0 no-underline"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Products"
                className="block py-2 pl-3 pr-4 text-black hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#FF4F1D] md:p-0 no-underline"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/Lessons"
                className="block py-2 pl-3 pr-4 text-black hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#FF4F1D] md:p-0 no-underline"
              >
                Lessons
              </Link>
            </li>
            <li>
              <Link
                to="/Blog"
                className="block py-2 pl-3 pr-4 text-black hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#FF4F1D] md:p-0 no-underline"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block py-2 pl-3 pr-4 text-black hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#FF4F1D] md:p-0 no-underline"
              >
                Cart
              </Link>
            </li>

            <Link
              to="/login"
              className="block py-2 pl-3 pr-4 text-black hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#FF4F1D] md:p-0 no-underline"
            >
              Login
            </Link>
          </ul>
        </div>
      </div>
      <div className="flex items-stretch bg-[#B0F0F6] border-8  border-transparent border-solid mr-8 ml-8"></div>
    </nav>
  );
}

export default Navbar;
