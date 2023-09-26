import React from "react";
import { BsFacebook } from "react-icons/bs"; //facebook
import { BiLogoInstagramAlt } from "react-icons/bi"; //instagram
import { FaLinkedin } from "react-icons/fa"; //linkedin
import { AiFillYoutube } from "react-icons/ai"; //youtube

function Socials() {
  return (
    <div>
      <div className="mt-0 flex pt-4 md:pt-0 items-center">
        <a href="https://www.facebook.com/beyondapogee/" className="w-8 mx-2">
          <BsFacebook className="text-blue-600 hover:text-blue-800 " />
        </a>
        <a href="https://www.facebook.com/beyondapogee/" className="w-6 mx-2">
          <BiLogoInstagramAlt className="text-pink-600 hover:text-pink-800" />
        </a>
        <a
          href="https://np.linkedin.com/company/beyond-apogee"
          className="w-6 mx-2"
        >
          <FaLinkedin className="text-blue-700 hover:text-blue-900" />
        </a>
        <a
          href="https://www.youtube.com/@beyondapogee7169"
          className="w-6 mx-2"
        >
          <AiFillYoutube className="text-red-600 hover:text-red-800" />
        </a>
      </div>
    </div>
  );
}

export default Socials;
