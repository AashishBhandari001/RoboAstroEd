import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@material-tailwind/react";

function Login() {
  return (
    <div className="flex items-center justify-center h-screen font-open-sans bg-gray-100">
      <div className="flex flex-col  md:space-y-2 md:bg-white md:shadow-2xl rounded-2xl md:flex-row">
        <div className="flex flex-col justify-center p-6 md:p-12">
          <span className="mb-2 text-2xl md:text-4xl font-bold">
            Welcome back!
          </span>
          <span className="font-light text-xs text-gray-400 mb-4 md:mb-8">
            Please enter your details
          </span>
          <form className="flex flex-col text-sm">
            <div className="text-sm">
              <span className="text-md">Username</span>
              <input
                type="text"
                name="username"
                id="username"
                className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
              />
            </div>
            <div>
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
              />
            </div>
          </form>
          <ul className="list-none pl-0 mt-0 text-sm">
            <li>
              <Link to={""} className="text-sm text-blue-600 no-underline">
                Forgot Password?
              </Link>
            </li>
          </ul>

          <div className="flex flex-col items-center space-y-2">
            <button className="bg-[#B0F0F6] hover:bg-[#AEEBF1] text-black border-transparent p-2 rounded-lg w-full">
              Sign in
            </button>
            <button className="bg-[#B0F0F6] hover:bg-[#AEEBF1] text-black border-transparent p-2 rounded-lg w-full">
              Sign in with Google
            </button>
          </div>
          <div className="text-center text-gray-400">
            Don't have an account?{" "}
            <Link to={""} className="no-underline text-blue-600">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
