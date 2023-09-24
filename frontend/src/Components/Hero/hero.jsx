import React from "react";
import Button from "../../Components/Button";
import Sajilobot from "../../Assets/Sajilobot.png";

function Hero() {
  return (
    <div className="md:flex md:bg-[#6FD9FF] md:mr-8 md:ml-8">
      <div className="hero font-open-sans md:mr-10 md:ml-10 md:rounded-b-lg">
        <div className="container flex justify-between items-center">
          <div className="text-black font-semibold text-sm pl-6 md:pl-4 md:pt-4">
            Fusion of Electronic and Education
          </div>
        </div>
        <p className="text-black font-normal text-center w-48 h-24 pl-14 pt-2 md:w-full md:h-auto md:pl-4 md:pt-4 md:text-left ">
          Sajilobot is an educational kit for the students. It provides a fusion
          of electronics and education, allowing students to learn and explore
          in a fun and interactive way.
          <div className="flex flex-row space-x-3 mt-2 pt-2 md:pl-4 md:pt-4 md:pb-6">
            <Button>Register</Button>
            <Button>Shop</Button>
          </div>
        </p>
      </div>
    </div>
  );
}

export default Hero;
