import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Logo from "../../Assets/logo.png";
import { LuLayoutDashboard, LuArrowUpDown } from "react-icons/lu";
import { VscListOrdered } from "react-icons/vsc";
import { GoBook } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";

const navlinks = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin",
    icon: <LuLayoutDashboard size={20} />,
  },
  {
    key: "product",
    label: "Product",
    dropdown: true,
    items: [
      { key: "allProducts", label: "All Products", path: "/admin/product" },
      { key: "addProduct", label: "Add Product", path: "/admin/product/add" },
    ],
    icon: <LuArrowUpDown size={20} />,
  },
  {
    key: "user",
    label: "User",
    path: "/admin/user",
    icon: <FaRegUser size={20} />,
  },
  {
    key: "order",
    label: "Order",
    path: "/admin/order",
    icon: <VscListOrdered size={20} />,
  },
  {
    key: "lessons",
    label: "Lessons",
    path: "/admin/lessons",
    icon: <GoBook size={20} />,
  },
];

const Sidebar = () => {
  const [isProductDropdownOpen, setProductDropdownOpen] = useState(false);

  const toggleProductDropdown = () => {
    setProductDropdownOpen(!isProductDropdownOpen);
  };

  return (
    <div className="h-screen p-6 pt-10 bg-cyan-700 text-white gap-2">
      <div className="flex flex-col justify-start">
        <div className="flex flex-row justify-between items-center mb-20 space-x-2">
          <img src={Logo} alt="company logo" className="w-14" />
          <Link to="/home">
            <span className="text-xl">Beyond Apogee</span>
          </Link>
        </div>
        <div className="flex-1 space-y-8 font-medium">
          {navlinks.map((item) => (
            <React.Fragment key={item.key}>
              {item.dropdown ? (
                <div className="relative group">
                  <button
                    onClick={toggleProductDropdown}
                    className="flex items-center space-x-6 text-white hover:text-gray-300"
                  >
                    {React.cloneElement(item.icon, { size: 32 })}
                    <span>{item.label}</span>
                  </button>
                  {isProductDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.key}
                            to={subItem.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center space-x-6 text-white hover:text-gray-300"
                >
                  {React.cloneElement(item.icon, { size: 32 })}
                  <span>{item.label}</span>
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
