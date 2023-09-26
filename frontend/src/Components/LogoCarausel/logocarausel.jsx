import React from "react";
import Dash from "../../Elements/Dash/dash";
// import Slider from 'infinite-react-carousel';

// Importing all the logos from logos folder
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
    <div className="bg-white text-black font-open-sans mr-4 ml-4 md:mr-8 md:ml-8">
      <div className="flex flex-col items-center text-center">
        <h3 className="md:justify-center">
          Institutions of Learningnpm That Trust Us! Join Us for a Unique
          Educational Adventure!
          <Dash />
        </h3>
      </div>
      <div className="flex flex-row m-auto overflow-hidden">
        <div className="animate-infinite-slider inset-y-0 left-0 flex space-x-2 md:space-x-4">
          {logos.map((logo, index) => (
            <div
              className="slide w-20 md:w-28 h-auto"
              key={index}
              style={{ animationDelay: `${index * 4}s` }}
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
  );
};

export default LogoCarousel;
