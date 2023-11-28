import React, { useState } from "react";
import logo from "../../../Assets/logo.png";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  BookOpenCheck,
  Users,
  ListOrdered,
  ArrowRightLeft,
  ArrowBigLeftDash,
} from "lucide-react";

const NavLinks = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    icon: Users,
  },
  {
    name: "Products",
    icon: ShoppingBag,
  },
  {
    name: "Lessons",
    icon: BookOpenCheck,
  },
  {
    name: "Orders",
    icon: ListOrdered,
  },
  {
    name: "Back",
    icon: ArrowBigLeftDash,
    to: "/Home",
  },
];

const variants = {
  expanded: {
    width: "20%",
  },
  nonExpanded: {
    width: "5%",
  },
};

const variants2 = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%", transition: { delay: 0.2 } }, // Added a delay
};

function Navigationbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div>
      {/* md screen and large screen */}
      <motion.div
        animate={isExpanded ? "expanded" : "nonExpanded"}
        variants={variants}
        className={
          "hidden md:block lg:block px-4 py-8 border border-r-1 w-1/5 h-screen relative " +
          (isExpanded ? "px-7" : "px-4")
        }
      >
        <div className="logo-div flex space-x-2 items-center ">
          <img
            src={logo}
            className={isExpanded ? "w-14" : "w-12 h-auto py-3"}
            alt="company logo"
          />
          <span className={isExpanded ? "block font-semibold" : "hidden"}>
            Beyond Apogee
          </span>
        </div>

        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-6 h-6 bg-cyan-400 rounded-full absolute -right-[10.5px] top-12 flex items-center justify-center"
        >
          <ArrowRightLeft className="w-4 text-white" />
        </div>

        <div className="mt-9 flex flex-col hover:cursor-pointer space-y-8">
          {NavLinks.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              onClick={() => setActiveIndex(index)}
              className={
                "flex space-x-2 items-center" +
                (activeIndex === index && isExpanded
                  ? " bg-cyan-400 p-2 text-white font-extrabold rounded-md"
                  : "")
              }
            >
              <item.icon />
              <span
                className={isExpanded ? "block text-sm font-medium" : "hidden"}
              >
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>
      </motion.div>

      {/* sm screen */}
      <motion.nav
        className=" md:hidden lg:hidden bg-white p-4 shadow-md justify-between"
        animate={isOpen ? "open" : "closed"}
        variants={variants2}
      >
        <div className="logo-div flex space-x-2 items-center justify-between w-full ">
          <img src={logo} className="w-12 h-12" alt="company logo" />
          <h1 className="block font-semibold">Beyond Apogee</h1>
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
        </div>

        {isNavOpen && (
          <div className="flex flex-col hover:cursor-pointer space-y-8 mt-5">
            {NavLinks.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                onClick={() => {
                  setActiveIndex(index);
                  closeNav();
                }}
                className={
                  "flex space-x-2 items-center" +
                  (activeIndex === index
                    ? " bg-cyan-400 p-2 text-white font-extrabold rounded-md"
                    : "")
                }
              >
                <item.icon />
                <span className="block text-sm font-medium">{item.name}</span>
              </NavLink>
            ))}
          </div>
        )}
      </motion.nav>
    </div>
  );
}

export default Navigationbar;
