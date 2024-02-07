import React from "react";
import {
  FaFacebookSquare,
  FaDribbble,
  FaGithub,
  FaYoutube,
} from "react-icons/fa"; // Importing icons from react-icons

function Socials() {
  return (
    <div>
      <div className="mt-0 flex pt-4 md:pt-0 items-center">
        <a href="https://www.youtube.com/" className="w-8 mx-2">
          <FaYoutube className="text-lightBlue-400 hover:text-lightBlue-600 " />
        </a>
        <a href="https://www.facebook.com/" className="w-8 mx-2">
          <FaFacebookSquare className=" text-lightBlue-600 hover:text-lightBlue-800" />
        </a>
        <a href="https://dribbble.com/" className="w-8 mx-2">
          <FaDribbble className="text-cyan-800 hover:text-pink-600" />
        </a>
        <a href="https://github.com/" className="w-8 mx-2">
          <FaGithub className="text-blueGray-800 hover:text-blueGray-900" />
        </a>
      </div>
    </div>
  );
}

export default Socials;
