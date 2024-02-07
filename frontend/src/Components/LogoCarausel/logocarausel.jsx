import React from "react";
import Dash from "../../Elements/Dash/dash";

import logo1 from "../../Logos/Logo1.png";


const logos = [
  logo1,

  logo1,
  logo1,
  logo1,
  logo1,
  logo1,
  logo1,
  logo1,
  logo1,

  logo1,
  logo1,
  logo1,
  logo1,
  logo1,
  logo1,
  logo1,
  logo1,

  logo1,
  logo1,
  logo1,
  logo1,
  logo1,
  logo1,
  logo1,

];

const LogoCarousel = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 mt-8">
      <div className="bg-white text-black font-open-sans mx-auto mb-2">
        <div className="flex flex-col items-center text-center mb-4">
          <h1 className="flex flex-row justify-center text-center item-center text-xl md:text-6xl text-cyan-600 my-1 mx-2">
            Institutions of Learning That Trust Us! Join Us for a Unique
            Educational Adventure!
          </h1>
        </div>
        <div className="flex flex-row m-auto overflow-hidden">
          <div className="animate-infinite-slider inset-y-0 left-0 flex space-x-2 md:space-x-4">
            {logos.map((logo, index) => (
              <div
                className="slide w-20 md:w-28 h-auto"
                key={index}
                style={{ animationDelay: `${index * 3}s` }}
              >
                <img
                  src={logo}
                  alt={`Logo ${index + 1}`}
                  className="mx-auto max-w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
