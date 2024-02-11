import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verifyEmail } from "../../Actions/userAction";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isVerified, loading, error } = useSelector(
    (state) => state.verifyEmail
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [dispatch, location.search]);

  const handleSubmit = () => {
    navigate("/account");
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-100 bg-opacity-50"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="bg-white p-8 rounded-md shadow-md text-center">
        {loading ? (
          <p className="text-lg font-bold">Verifying...</p>
        ) : error ? (
          <div>
            <p className="text-lg text-red-600 font-bold mb-2 text-6xl">
              Verification Failed:
            </p>
            <p className="text-lg text-red-600">{error}</p>
          </div>
        ) : isVerified ? (
          <div>
            <p className="text-lg text-green-600 font-bold mb-4 text-6xl">
              Email Verified Successfully!
            </p>
            <p className="text-lg mb-4 font-normal text-xl">
              <span className="font-semibold">Congratulations! 🥳🥳🥳</span>
              <br />
              Your email has been successfully verified.
              <br />
              You can now proceed to login. 🎉🎉
            </p>

            <button
              onClick={handleSubmit}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md p-3 mt-4 mb-4"
            >
              Proceed to login
            </button>
          </div>
        ) : (
          <p className="text-lg text-red-600 font-bold text-6xl">
            Invalid or expired token.
          </p>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
