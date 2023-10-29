import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ForgetPassword() {
  const [message, setMessage] = useState(""); // email state
  const [newPassword, setNewPassword] = useState(""); // State for the new password

  const { id, token } = useParams();

  const userValid = async (id, token) => {
    try {
      // Your existing code for user validation remains unchanged
      // ...
    } catch (error) {
      console.error("Error fetching user validation:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the new password to the server for updating the user's credentials
      const res = await fetch(
        `http://localhost:8080/api/auth/forgetpassword/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      const data = await res.json();

      // Handle response accordingly, e.g., show success message
    } catch (error) {
      console.error("Error updating password:", error);
      // Handle error, show an error message, etc.
    }
  };

  useEffect(() => {
    userValid(id, token);
  }, [id, token]);

  return (
    <div className="flex md:space-y-2 bg-white shadow-2xl rounded-2xl flex-row justify-center items-center h-screen">
      <div className="flex md:space-y-2 bg-white shadow-2xl rounded-2xl flex-row">
        <div className="flex flex-col justify-center p-6 md:p-12">
          <span className="mb-6 text-2xl text-center md:text-4xl font-bold">
            Enter Your New Password
          </span>
          {message ? (
            <p className="text-green-600 font-bold ">
              Password Reset link sent Successfully in your Email
            </p>
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
