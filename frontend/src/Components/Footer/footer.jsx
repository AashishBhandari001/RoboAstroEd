import React from "react";
import { Link } from "react-router-dom";
import Socials from "../../Elements/Socials/socials";

function Footer() {
  return (
    <footer className="bottom-0 left-0 w-full bg-gray-100 pt-8 pb-6 flex-shrink-0">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="w-full lg:w-6/12 px-4">
          <h4 className="text-3xl font-semibold text-blueGray-700">
            Let's keep in touch!
          </h4>
          <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
            Find us on any of these platforms, we respond 1-2 business days.
          </h5>
          <div className="mt-6 lg:mb-0 mb-6">
            <Socials />
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className="flex flex-wrap items-top mb-6">
            <div className="w-full lg:w-4/12 px-4 ml-auto">
              <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                Useful Links
              </span>
              <ul className="list-unstyled">
                <li>
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    to="/home"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    to="/products"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    to="/lessons"
                  >
                    Online Courses
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    to="/products"
                  >
                    Free Products
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                Other Resources
              </span>
              <ul className="list-unstyled">
                <li>
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    to="/terms"
                  >
                    Company VAT
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    to="/terms"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    to="/terms"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    to="/contact"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-6 border-blueGray-300" />
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
          <div className="text-sm text-blueGray-500 font-semibold py-1">
            Copyright © <span id="get-current-year">2024</span>{" "}
            <a
              href="https://www.creative-tim.com/product/notus-js"
              className="text-blueGray-500 hover:text-gray-800"
              target="_blank"
            >
              Created by
            </a>{" "}
            <a
              href="https://www.creative-tim.com?ref=njs-profile"
              className="text-blueGray-500 hover:text-blueGray-800"
            >
              ROBOASTROED
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
