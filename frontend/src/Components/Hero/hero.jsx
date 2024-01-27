import React from "react";
import Button from "../../Components/Button";
import Student from "../../Assets/Student_1.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
      <div className="flex flex-col md:flex-row md:ml-28 items-center justify-center">
        <div className="mb-14 lg:mb-0 lg:w-1/2 md:w-1/2 mx-auto md:text-center">
          <h1 className="max-w-xl md:text-5xl leading-none text-gray-900 font-bold text-center lg:text-left lg:leading-tight">
            Empowering Young Minds Through Innovation
          </h1>
          <p className="max-w-xl text-center  text-gray-500 lg:text-left lg:max-w-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem, cupiditate. Quaerat et possimus sunt iure distinctio
            quae. Error, molestias laudantium.
          </p>
          <div className="flex space-x-4 mt-6 md:mt-6 justify-center  lg:justify-start">
            <Link to="/contact">
              <Button>Register</Button>
            </Link>

            <Link to="/products">
              <Button>Shop</Button>
            </Link>
          </div>
        </div>
        <div className="flex-col md:flex lg:w-1/2">
          <div className="w-96 p-4 border rounded-lg bg-white">
            <img src={Student} alt="" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
