import React from "react";
import Sajilobot from "../../Assets/Sajilobot.png";

function Hero() {
  return (
    <body>
      <div className="md:flex md:bg-[#6FD9FF] md:mr-8 md:ml-8">
        <div className="hero font-open-sans md:mr-10 md:ml-10">
          <div className="container flex justify-between items-center">
            <div className="text-black font-semibold text-sm pl-6 md:pl-4 md:pt-4">
              Fusion of Electronic and Education
            </div>
          </div>
          <div className="text-black font-normal text-start w-48 h-24 pl-14 pt-2 md:w-full md:h-auto md:pl-4 md:pt-4 md:text-left ">
            Sajilobot is an educational kit for the students. It provides a
            fusion of electronics and education, allowing students to learn and
            explore in a fun and interactive way.
            <div className="flex flex-row space-x-6 mt-2 pt-2 md:pl-4 md:pt-4 md:pb-6">
            <button className="text-white border-transparent bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-normal rounded-sm text-sm px-4 py-2 text-center">
                Register
              </button>
              <button className="text-white border-transparent bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-normal rounded-sm text-sm px-4 py-2 text-center">
                Shop
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Hero;
