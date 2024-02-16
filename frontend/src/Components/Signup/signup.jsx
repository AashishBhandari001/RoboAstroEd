import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../OAuth/oauth";
import MetaData from "../../Router/Metadata/metaData";
import { RxEyeOpen } from "react-icons/rx";
import { FaRegEyeSlash } from "react-icons/fa6";

const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(); // error handling
  const [loading, setLoading] = useState(false); // loading state
  const [showPassword, setShowPassword] = useState(false); // state to toggle password visibility
  const navigate = useNavigate(); // initialize navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null); // Clear error after 10 seconds
    }, 10000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${backendBaseUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.error);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/verification");
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  // Password validation function
  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="flex items-center justify-center h-screen font-open-sans mt-14 mb-4 bg-gray-100">
      <MetaData title="Sign Up" />
      <div className="flex flex-col space-y-2 bg-white shadow-2xl rounded-2xl max-w-sm">
        <div className="flex flex-col justify-center p-6 md:p-12">
          <span className="mb-2 text-2xl md:text-4xl font-bold">
            Join Us Today
          </span>
          <span className="font-light text-xs text-gray-400 mb-4 md:mb-8">
            Please enter your details
          </span>
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          <form onSubmit={handleSubmit} className="flex mr-3 flex-col text-sm">
            <div className="text-sm">
              <span className="text-md">Username</span>
              <input
                type="text"
                id="username"
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
              />
            </div>
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
            <div className="relative">
              <span className="mb-2 text-md">Password</span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
              />
              <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 right-3 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <RxEyeOpen className="h-5 w-5 text-gray-500" />
                ) : (
                  <FaRegEyeSlash className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {formData.password && !isPasswordValid(formData.password) && (
              <div className="text-red-600 text-sm mb-2">
                Password must contain at least one number and one symbol
                (!@#$%^&*) and be at least 8 characters long.
              </div>
            )}

            <div className="flex flex-col space-y-2">
              <button
                disabled={loading}
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold border-transparent p-2 rounded-lg w-full flex items-center justify-center"
              >
                {loading ? "Loading..." : "Sign up"}
              </button>
              <OAuth />
            </div>
          </form>
          <div className="text-center text-gray-400 pt-2">
            Already have an account?
            <Link to="/account" className="no-underline text-blue-600">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
