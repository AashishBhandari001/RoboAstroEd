import React from "react";
import checked from "../../Assets/checked.png";
import { useNavigate } from "react-router-dom";

function Verification() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/account");
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md text-center">
        <div className="flex flex-col items-center">
          <img src={checked} alt="checked-mark image" className="h-24 w-auto" />

          <p className="font-bold text-green-500 text-6xl mt-4 mb-4">
            Registration Successful!! 🎉🎉🎉
          </p>

          <p className="text-xs text-gray-500">
            Your Registration is successful! <br />
            All you need to do is verify your email address. <br /> <br />
            Don't see the email? <br />
            Check your spam folder, or unwanted emails. <br />
          </p>

          <button
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-md w-full mt-4"
            onClick={handleNavigate}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verification;
