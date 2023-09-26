import React from "react";
import { Link } from "react-router-dom";
import Socials from "../../Elements/Socials";
import { IoLocation } from "react-icons/io5";
import { MdContactPhone } from "react-icons/md";
import { CgMailOpen } from "react-icons/cg";

function Footer() {
  return (
    <footer>
      <div className="footer bg-gray-100 font-open-sans mr-4 ml-4">
        <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-center">
          {/* ----------------------------Home page-----------------------------------*/}
          <div className="p-5 w-48 md:w-auto">
            <div className="text-xs uppercase text-gray-500 font-medium">
              Home Page
            </div>
            <Link
              to="/Home"
              className="my-3 block no-underline hover:text-[#FF4F1D] text-gray-500"
            >
              Home
            </Link>
            <Link
              to="/Products"
              className="my-3 block no-underline hover:text-[#FF4F1D] text-gray-500"
            >
              Products
            </Link>
            <Link
              to="/Lessons"
              className="my-3 block no-underline hover:text-[#FF4F1D] text-gray-500"
            >
              Lessons
            </Link>
            <Link
              to="/Blog"
              className="my-3 block no-underline hover:text-[#FF4F1D] text-gray-500"
            >
              Blog
            </Link>
          </div>

          {/* ----------------------------User-----------------------------------*/}
          <div className="p-5 w-48 md:w-auto">
            <div className="text-xs uppercase text-gray-500 font-medium">
              User
            </div>
            <Link
              to="/SignIn"
              className="my-3 block no-underline hover:text-[#FF4F1D] text-gray-500"
            >
              Sign In
            </Link>
            <Link
              to="/SignUp"
              className="my-3 block no-underline hover:text-[#FF4F1D] text-gray-500"
            >
              Sign up
            </Link>
            <Link
              to="/RegisterSchool"
              className="my-3 block no-underline hover:text-[#FF4F1D] text-gray-500"
            >
              Register School
            </Link>
          </div>

          {/* ----------------------------Resources-----------------------------------*/}
          <div className="p-5 w-48 md:w-auto">
            <div className="text-xs uppercase text-gray-500 font-medium">
              Resources
            </div>
            <Link
              to="/Documentation"
              className="my-3 block no-underline hover:text-[#FF4F1D] text-gray-500"
            >
              Documentation
            </Link>
            <Link
              to="/SajiloBotGuide"
              className="my-3 block no-underline hover:text-[#FF4F1D] text-gray-500"
            >
              SajiloBot Guide
            </Link>
          </div>

          {/* ----------------------------Product-----------------------------------*/}
          <div className="p-5 w-48 md:w-auto">
            <div className="text-xs uppercase text-gray-500 font-medium">
              Product
            </div>
            <Link
              to="/OurProducts"
              className="my-3 block no-underline hover:text-[#FF4F1D] text-gray-500"
            >
              Our Products
            </Link>
            <Link
              to="/SajilBot"
              className="my-3 block no-underline hover:text-[#FF4F1D] text-gray-500"
            >
              SajilBot
            </Link>
            <Link
              to="/Satellites"
              className="my-3 block no-underline hover:text-[#FF4F1D] text-gray-500"
            >
              Satellites
            </Link>
            <Link
              to="/ElectricalComponents"
              className="my-3 block no-underline hover:text-[#FF4F1D] text-gray-500"
            >
              Electrical Components
            </Link>
          </div>

          {/* ----------------------------Contact us-----------------------------------*/}
          <div className="p-5 w-48 md:w-auto">
            <div className="text-xs uppercase text-gray-500 font-medium">
              Contact us
            </div>
            <div className="my-3 block no-underline hover:text-[#FF4F1D] text-gray-500">
              <IoLocation className="text-red-500 pr-1" />
              Budanilkantha-12, golfutar, Kathmandu, Nepal
            </div>
            <div className="my-3 block no-underline hover:text-[#FF4F1D] text-gray-500">
              <MdContactPhone className="text-blue-500 pr-1" />
              +977-984-1234567
            </div>
            <div className="hidden md:flex my-3 no-underline hover:text-[#FF4F1D] text-gray-500">
              <CgMailOpen className="text-blue-500 pr-1" />
              sudip.beyondapogee@gmail.com
            </div>
            <div className="flex md:hidden lg:hidden ">
              <CgMailOpen className="text-blue-500 pr-1" />
              sudip.beyondapogee
              <br />
              @gmail.com
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col md:flex-row justify-center md:justify-between lg:justify-between  items-center md:pl-28 text-gray-600 pb-4 md:mr-40">
            <div className="flex ">© Copyright 2023. All Rights Reserved.</div>
            <Socials />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
