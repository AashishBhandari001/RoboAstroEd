import React from "react";
import Lab from "../../Assets/lab.png";
import Lab2 from "../../Assets/lab2.png";
import WaterRocket from "../../Assets/waterRocket.png";

const OurDetail = () => {
  return (
    <div className="font-open-sans bg-cyan-700 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col text-white text-center items-center justify-center p-4">
          <h2 className="md:text-[22px] text-[19px] font-bold mb-2">
            Robotics and Astronomy Education
          </h2>
          <p className="text-lg text-justify md:text-center  mt-2 max-w-5xl sm:mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor
            sit amet, consectetur adipiscing elit.
          </p>
        </div>
        {/* image grid */}
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 md:flex-row md:justify-center md:space-y-0 md:space-x-4">
          <div className="flex flex-col sm:max-w-3xl">
            <img
              src={WaterRocket}
              alt="lab"
              className="border rounded-lg shadow-lg h-80 w-80 sm:h-auto sm:w-auto"
            />
          </div>
          <div className="flex flex-col sm:max-w-3xl">
            <img
              src={Lab}
              alt="lab"
              className="border rounded-lg shadow-lg h-80 w-80 sm:h-auto sm:w-auto"
            />
          </div>
          <div className="flex flex-col sm:max-w-3xl">
            <img
              src={Lab2}
              alt="lab"
              className="border rounded-lg shadow-lg h-80 w-80 sm:h-auto sm:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurDetail;
