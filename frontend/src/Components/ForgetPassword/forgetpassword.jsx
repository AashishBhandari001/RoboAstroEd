import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { RxEyeOpen } from "react-icons/rx";
import { FaRegEyeSlash } from "react-icons/fa6";
import MetaData from "../../Router/Metadata/metaData";

const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

function ForgetPassword() {
  const alert = useAlert();
  const [message, setMessage] = useState(""); // email state
  const [newPassword, setNewPassword] = useState(""); // State for the new password
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [error, setError] = useState(""); // State for password error
  const navigate = useNavigate(); // initialize navigation

  const { id, token } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the new password to the server for updating the user's credentials
      const res = await fetch(
        `${backendBaseUrl}/api/auth/forgetpassword/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      if (res.ok) {
        setMessage("Password updated successfully!");
        alert.success("Password updated successfully!");
        navigate("/Account");

        setTimeout(() => {}, 5000);
      } else {
        const data = await res.json();
        setError(data.error);
      }

      // Handle response accordingly, e.g., show success message
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Failed to update the password. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex md:space-y-2 bg-white shadow-2xl rounded-2xl flex-row justify-center items-center h-screen ">
      <MetaData title="forget password" />
      <div className="flex md:space-y-2 bg-white shadow-2xl rounded-2xl flex-row max-w-sm">
        <div className="flex flex-col justify-center p-6 md:p-12">
          <span className="mb-6 text-2xl text-center md:text-4xl font-bold">
            Enter Your New Password
          </span>
          {message ? (
            <p className="text-green-600 font-bold ">{message}</p>
          ) : (
            ""
          )}
          {error && <p className="text-red-600 font-bold mb-2">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col text-sm">
            <div>
              <span className="mb-2 text-md">Password</span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} // Update the new password state
                  className="w-full mb-4 p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaRegEyeSlash className="mb-4" />
                  ) : (
                    <RxEyeOpen className="mb-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-md w-full"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
