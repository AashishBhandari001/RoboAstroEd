import React, { useState } from "react";
import logo from "../../../Assets/logo.png";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  BookOpenCheck,
  Users,
  ListOrdered,
  ArrowRightLeft,
} from "lucide-react";

const navLinks = [
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
];

const variants = {
  expanded: {
    width: "20%",
  },
  nonExpanded: {
    width: "5%",
  },
};

function Navigationbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>

      <motion.div
        animate={isExpanded ? "expanded" : "nonExpanded"}
        variants={variants}
        className={
          " hidden md:block lg:block px-4 py-8 border border-r-1 w-1/5 h-screen relative " +
          (isExpanded ? "px-7" : "px-4")
        }
      >
        <div className="logo-div flex space-x-2 items-center ">
          <img
            src={logo}
            className={isExpanded ? "w-14" : " w-12 h-auto py-3"}
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

        <div className="mt-9 flex flex-col hover:cursor-pointer space-y-8 ml-4">
          {navLinks.map((item, index) => (
            <div
              key={index}
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
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Navigationbar;
