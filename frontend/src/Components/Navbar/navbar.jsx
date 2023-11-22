import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "../../Redux/user/userSlice";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logoutStart());
      const res = await fetch("http://localhost:8080/api/auth/logout");
      const data = await res.json();
      if (data.success === false) {
        console.log(data.error);
        logoutFailure(data.error);
        return;
      }
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error));
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between font-open-sans list-none no-underline md:mx-auto p-4 md:mr-4">
        <div className="md:ml-6">
          <NavLink
            to="/Home"
            className="flex items-center text-black no-underline hover:text-[#FF4F1D]"
            onClick={closeNav}
          >
            <img
              src={logo}
              className="h-12 mr-3 md:h-14"
              alt="Beyond Apogee Logo"
            />
            <div className="text-black text-sm md:text-xl">Beyond Apogee</div>
          </NavLink>
        </div>
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
          } w-full md:block md:w-auto mt-4 md:mt-0 md:mr-5`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col list-none md:flex-row md:space-x-8">
            <li>
              <NavLink
                to="/Home"
                className="block py-2 pl-3 pr-4 text-black bg-[#B0F0F6] md:bg-transparent md:hover:text-[#FF4F1D] md:p-0 no-underline"
                aria-current="page"
                onClick={closeNav}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className="block py-2 pl-3 pr-4 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF4F1D] md:p-0 no-underline"
                onClick={closeNav}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Lessons"
                className="block py-2 pl-3 pr-4 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF4F1D] md:p-0 no-underline"
                onClick={closeNav}
              >
                Lessons
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/Contact"
                className="block py-2 pl-3 pr-4 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF4F1D] md:p-0 no-underline"
                onClick={closeNav}
              >
                Contact Us
              </NavLink>
            </li>

            {isAuthenticated && currentUser && currentUser.role === "admin" ? (
              <li>
                <NavLink
                  to="/Admin"
                  className="block py-2 pl-3 pr-4 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF4F1D] md:p-0 no-underline"
                  onClick={closeNav}
                >
                  Admin
                </NavLink>
              </li>
            ) : null}

            <li>
              <NavLink
                to="/Cart"
                className="block py-2 pl-3 pr-8 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF4F1D] md:p-0 no-underline relative"
              >
                Cart
                <span className="inline-flex items-center rounded-full bg-[#FF4F1D] text-xs font-medium text-white px-1 absolute top-0 right-[-10px] transform translate-x-1/2 -translate-y-1/2">
                  {" "}
                  0
                </span>
              </NavLink>
            </li>

            <li>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="block py-2 pl-3 pr-4 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF4F1D] md:p-0 no-underline"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/Account"
                  className="block py-2 pl-3 pr-4 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF4F1D] md:p-0 no-underline"
                  onClick={closeNav}
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
