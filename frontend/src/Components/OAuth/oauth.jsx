import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaGooglePlusG } from "react-icons/fa6";

import app from "../../firebase";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../Redux/user/userSlice";

const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      dispatch(signInStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch(`${backendBaseUrl}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        // Check if there's an error
        console.log(data.error);
        dispatch(signInFailure(data.error));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/Home"); //if successful, navigate to Home
    } catch (err) {
      dispatch(signInFailure(err));
      console.log("Could not sign in with google", err);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold border-transparent p-2 rounded-lg w-full flex items-center justify-center"
    >
      <FaGooglePlusG className="text-xl text-white font-bold " />
      Continue with Google
    </button>
  );
}

export default OAuth;
