import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../../Elements/ErrorPopup";
import MetaData from "../../Router/Metadata/metaData";

const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

function PasswordReset() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(); // error handling
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // email state
  const navigate = useNavigate(); // initialize navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();
    try {
      setLoading(false);
      const res = await fetch(`${backendBaseUrl}/api/auth/passwordreset`, {
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
      } else {
        setEmail("");
        setMessage("Password Reset link sent Successfully in your Email");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      setError(err);
    }
  };

  const handleBack = () => {
    setError(null); // Clear the error state
  };

  return (
    <div className="flex items-center justify-center h-screen font-open-sans mt-14 mb-4 bg-gray-100">
      <MetaData title="password reset" />
      {error ? ( 
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
              <div className="flex flex-col items-center space-y-2">
                <button
                  disabled={loading}
                  type="submit"
                  onClick={sendLink}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-md w-full"
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
