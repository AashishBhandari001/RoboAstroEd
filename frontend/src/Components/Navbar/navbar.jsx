import React, { useState } from "react";
import { Fragment } from "react";
import RoboAstroEd from "../../Assets/RoboAstroEd.png";
import { NavLink } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";

import { useSelector, useDispatch } from "react-redux";
import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "../../Redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

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
      localStorage.removeItem("access_token");
      navigate("/home");
    } catch (error) {
      dispatch(logoutFailure(error));
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="mx-auto max-w-7xl justify-center ">
        <div className="flex flex-wrap items-center justify-between font-open-sans list-none no-underline md:mx-auto p-4 md:mr-4">
          <div className="md:ml-6">
            <NavLink
              to="/home"
              className="flex items-center text-black no-underline hover:text-[#FF4F1D]"
              onClick={closeNav}
            >
              <img
                src={RoboAstroEd}
                className="h-14 mr-3"
                alt="Beyond Apogee Logo"
              />
              <div className="text-black text-sm md:text-xl">RoboAstroEd</div>
            </NavLink>
          </div>
          <button
            onClick={toggleNav}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm md:hidden focus:outline-none focus:ring-2"
            aria-controls="navbar-default"
            aria-expanded={isNavOpen ? "true" : "false"}
          >
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
                  to="/home"
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
                  to="/lessons"
                  className="block py-2 pl-3 pr-4 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF4F1D] md:p-0 no-underline"
                  onClick={closeNav}
                >
                  Lessons
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className="block py-2 pl-3 pr-4 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF4F1D] md:p-0 no-underline"
                  onClick={closeNav}
                >
                  Contact Us
                </NavLink>
              </li>

              {isAuthenticated &&
              currentUser &&
              currentUser.role === "admin" ? (
                <li>
                  <NavLink
                    to="/admin"
                    className="block py-2 pl-3 pr-4 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF4F1D] md:p-0 no-underline"
                    onClick={closeNav}
                  >
                    Admin
                  </NavLink>
                </li>
              ) : null}

              <li>
                <NavLink
                  to="/cart"
                  onClick={closeNav}
                  className="block py-2 pl-3 pr-8 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF4F1D] md:p-0 no-underline relative"
                >
                  Cart
                  <span className="inline-flex items-center rounded-full  text-xs font-medium bg-cyan-600  text-white px-1 absolute top-0 right-[-10px] transform translate-x-1/2 -translate-y-1/2">
                    {cartItems.length}
                  </span>
                </NavLink>
              </li>

              {isAuthenticated && currentUser ? (
                <li className="relative group">
                  <Menu as="div" className="inline-block">
                    <div>
                      <Menu.Button className="block py-2 pl-3 pr-4 text-black md:hover:bg-transparent md:hover:text-[#FF4F1D] md:p-0 no-underline focus:outline-none">
                        Account
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <NavLink
                            to="/change-password"
                            className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                            onClick={closeNav}
                          >
                            Change Password
                          </NavLink>
                          <NavLink
                            to="/my-orders"
                            onClick={closeNav}
                            className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                          >
                            My Orders
                          </NavLink>

                          <li>
                            <button
                              onClick={() => {
                                handleLogout();
                                closeNav();
                              }}
                              className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                            >
                              Logout
                            </button>
                          </li>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/account"
                    className="block py-2 pl-3 pr-4 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF4F1D] md:p-0 no-underline"
                    onClick={closeNav}
                  >
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
