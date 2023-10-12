import React from "react";
import { Link } from "react-router-dom";

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
              <span className="text-md">Email</span>
              <input
                type="text"
                id="Email"
                className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
              />
            </div>
            <div>
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
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
            <button className="bg-[#B0F0F6] hover:bg-[#AEEBF1] text-black border-transparent p-2 rounded-lg w-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                className="w-6 h-6 mr-2"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Sign in with Google
            </button>
          </div>
          <div className="text-center text-gray-400">
            Don't have an account?{" "}
            <Link to="/Register" className="no-underline text-blue-600">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
