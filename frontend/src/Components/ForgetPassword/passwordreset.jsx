import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorPopup from "../../Elements/ErrorPopup";

function PasswordReset() {
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(); // error handling

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // email state
  const navigate = useNavigate(); // initialize navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value});
  };

  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/auth/passwordreset", {
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
      // navigate("/Account");
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const handleBack = () => {
    setError(null); // Clear the error state
  };

  return (
    <div className="flex items-center justify-center h-screen font-open-sans mt-14 mb-4 bg-gray-100">
      {error ? ( // Check if there's an error
        <div className="text-center">
          <ErrorPopup error={error} onBack={handleBack} />
        </div>
      ) : (
        <div className="flex md:space-y-2 bg-white shadow-2xl rounded-2xl flex-row">
          <div className="flex flex-col justify-center p-6 md:p-12">
            <span className="mb-6 text-2xl text-center md:text-4xl font-bold">
              Enter Your Email
            </span>
            {message ? (
              <p className="text-green-600 font-bold ">
                Password Reset link sent Successfully in your Email
              </p>
            ) : (
              ""
            )}
            <form onSubmit={sendLink} className="flex flex-col text-sm">
              <div>
                <span className="mb-2 text-md">Email</span>
                <input
                  type="text"
                  id="email"
                  onChange={handleChange}
                  className="w-full mb-4 p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
                />
              </div>
              <div className="flex flex-col ml-4 items-center space-y-2">
                <button
                  disabled={loading}
                  type="submit"
                  onClick={sendLink}
                  className="bg-[#B0F0F6] hover-bg-[#AEEBF1] text-black border-transparent p-2 rounded-lg w-full"
                >
                  {loading ? "Loading..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PasswordReset;
