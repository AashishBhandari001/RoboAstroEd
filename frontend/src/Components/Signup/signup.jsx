import React from "react";
import ErrorPopup from "../../Elements/ErrorPopup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../OAuth/oauth";

function Signup() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/auth/signup", {
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
      navigate("/Account");
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen font-open-sans mt-14 mb-4 bg-gray-100">
      {error ? ( // Check if there's an error
        <div className="text-center">
          <ErrorPopup error={error} onBack={handleBack} />
        </div>
      ) : (
        <div className="flex flex-col md:space-y-2 md:bg-white md:shadow-2xl rounded-2xl md:flex-row">
          <div className="flex flex-col justify-center p-6 md:p-12">
            <span className="mb-2 text-2xl md:text-4xl font-bold">
              Join Us Today
            </span>
            <span className="font-light text-xs text-gray-400 mb-4 md:mb-8">
              Please enter your details
            </span>
            <form onSubmit={handleSubmit} className="flex flex-col text-sm">
              <div className="text-sm">
                <span className="text-md">Username</span>
                <input
                  type="text"
                  id="username"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
                />
              </div>
              <div>
                <span className="mb-2 text-md">Email</span>
                <input
                  type="text"
                  id="email"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
                />
              </div>
              <div>
                <span className="mb-2 text-md">Password</span>
                <input
                  type="password"
                  id="password"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
                />
              </div>

              <ul className="list-none pl-0 mt-0 text-sm">
                <li>
                  <Link to={""} className="text-sm text-blue-600 no-underline">
                    Forgot Password?
                  </Link>
                </li>
              </ul>

              <div className="flex flex-col items-center space-y-2">
                <button
                  disabled={loading}
                  type="submit"
                  className="bg-[#B0F0F6] hover-bg-[#AEEBF1] text-black border-transparent p-2 rounded-lg w-full"
                >
                  {loading ? "Loading..." : "Sign up"}
                </button>
                <OAuth />
              </div>
            </form>
            <div className="text-center text-gray-400 pt-2">
              Already have an account?
              <Link to="/Account" className="no-underline text-blue-600">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
