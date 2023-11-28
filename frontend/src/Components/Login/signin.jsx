import React from "react";
import ErrorPopup from "../../Elements/ErrorPopup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../OAuth";
import MetaData from "../../Router/Metadata/metaData";

import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../Redux/user/userSlice";

import Loading from "../../Elements/Loading";

function Signin() {
  const [message, setMessage] = useState(""); // error message
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(); // error handling
  const [loading, setLoading] = useState(false); // loading state
  const navigate = useNavigate(); // initialize navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleBack = () => {
    setError(null); // Clear the error state
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.error));
        setMessage(data.error);
        return;
      }
      dispatch(signInSuccess(data));
      setMessage("Logged in successfully!");
      navigate("/Home");
    } catch (err) {
      dispatch(signInFailure(err));
    }
  };
  return (
    <div className="flex items-center justify-center h-screen font-open-sans mt-14 mb-4 bg-gray-100">
      <MetaData title="Sign In" />
      <div className="flex flex-col md:space-y-2 bg-white shadow-2xl rounded-2xl">
        <div className="flex flex-col justify-center p-6 md:p-12">
          <span className="mb-2 text-2xl md:text-4xl font-bold">
            Welcome back!
          </span>
          <span className="font-light text-xs text-gray-400 mb-4 md:mb-8">
            Please enter your details
          </span>
          {message ? <p className="text-red-600 font-bold ">{message}</p> : ""}
          <form onSubmit={handleSubmit} className="flex flex-col text-sm">
            <div>
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                id="email"
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
              />
            </div>
            <div>
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                required
                className="w-full p-2 mb-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
              />
            </div>

            <div>
              <li className="list-none mb-4">
                <Link
                  to="/passwordReset"
                  className="no-underline text-blue-600"
                >
                  Forgot Password?
                </Link>
              </li>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <button
                disabled={loading}
                type="submit"
                className="bg-[#B0F0F6] hover-bg-[#AEEBF1] text-black border-transparent p-2 rounded-lg w-full"
              >
                {loading ? "Loading..." : "Sign in"}
              </button>
              <OAuth />
            </div>
          </form>
          <div className="text-center text-gray-400 pt-2">
            Dont have an Account?
            <Link to="/register" className="no-underline text-blue-600">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
