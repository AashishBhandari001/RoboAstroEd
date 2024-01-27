import React from "react";
import Dash from "../../Elements/Dash/dash";

import logo1 from "../../Logos/Logo1.png";
import logo2 from "../../Logos/Logo2.png";
import logo3 from "../../Logos/Logo3.png";
import logo4 from "../../Logos/Logo4.png";
import logo5 from "../../Logos/Logo5.png";
import logo6 from "../../Logos/Logo6.png";
import logo7 from "../../Logos/Logo7.png";
import logo8 from "../../Logos/Logo8.png";
import logo9 from "../../Logos/Logo9.png";
import logo10 from "../../Logos/Logo10.png";

const logos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
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
