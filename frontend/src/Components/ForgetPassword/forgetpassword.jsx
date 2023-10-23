import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ForgetPassword() {
  const [message, setMessage] = useState(""); // email state

  const { id, token } = useParams();

  const userValid = async (id, token) => {
    const res = await fetch(
      `http://localhost:8080/api/auth/forgetpassword/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (data.success === false) {
      setMessage(data.error);
      console.log("user not valid");
    } else {
      console.log("user valid");
    }
  };

  useEffect(() => {
    userValid(id, token);
  }, []);

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
          <form onSubmit="" className="flex flex-col text-sm">
            <div>
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                id="password"
                // onChange=""
                className="w-full mb-4 p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
              />
            </div>
            <div className="flex flex-col ml-4 items-center space-y-2">
              <button
                type="submit"
                // onClick=""
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
