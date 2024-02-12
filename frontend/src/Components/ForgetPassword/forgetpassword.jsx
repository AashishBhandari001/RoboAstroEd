import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

function ForgetPassword() {
  const [message, setMessage] = useState(""); // email state
  const [newPassword, setNewPassword] = useState(""); // State for the new password
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
        setTimeout(() => {
          navigate("/Account");
        }, 5000);
      } else {
        setMessage("Failed to update the password. Please try again.");
      }

      // Handle response accordingly, e.g., show success message
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Failed to update the password. Please try again.");
    }
  };

  return (
    <div className="flex md:space-y-2 bg-white shadow-2xl rounded-2xl flex-row justify-center items-center h-screen">
      <div className="flex md:space-y-2 bg-white shadow-2xl rounded-2xl flex-row">
        <div className="flex flex-col justify-center p-6 md:p-12">
          <span className="mb-6 text-2xl text-center md:text-4xl font-bold">
            Enter Your New Password
          </span>
          {message ? (
            <p className="text-green-600 font-bold ">{message}</p>
          ) : (
            ""
          )}
          <form onSubmit={handleSubmit} className="flex flex-col text-sm">
            <div>
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                id="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} // Update the new password state
                className="w-full mb-4 p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
              />
            </div>
            <div className="flex flex-col ml-4 items-center space-y-2">
              <button
                type="submit"
                className="bg-[#B0F0F6] hover-bg-[#AEEBF1] text-black border-transparent p-2 rounded-lg w-full"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
