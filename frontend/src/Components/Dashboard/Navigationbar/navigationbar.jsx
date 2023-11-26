import React, { useState } from "react";
import logo from "../../../Assets/logo.png";
import {
  LayoutDashboard,
  ShoppingBag,
  BookOpenCheck,
  Users,
  ListOrdered,
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

function Navigationbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="px-4 py-8 border border-r-1 w-1/5 h-screen">
      <div className="logo-div flex space-x-2 items-center ">
        <img src={logo} className="h-12 md:h-14" alt="company logo" />
        <span className=" font-medium">Beyond Apogee</span>
      </div>

      <div className="mt-9 flex flex-col space-y-8 ml-4">
        {navLinks.map((item, index) => (
          <div
            key={index}
            className={
              "flex space-x-2 items-center" +
              (activeIndex === index
                ? " bg-cyan-400 p-2 text-white font-semibold"
                : "")
            }
          >
            <item.icon />
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navigationbar;
