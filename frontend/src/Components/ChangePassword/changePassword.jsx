import React, { useState } from "react";
import MetaData from "../../Router/Metadata/metaData";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../Actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const alert = useAlert();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { loading, error, isUpdated } = useSelector((state) => state.changePSW);
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  if (!currentUser) {
    navigate("/account");
    return null; // Return null to prevent rendering of the component
  }
  const id = currentUser._id;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if new password matches the confirm new password
    if (formData.newPassword !== formData.confirmNewPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const { email, oldPassword, newPassword } = formData;
    // Dispatch action to change password
    dispatch(
      changePassword(
        id,
        {
          email: formData.email,
          oldpassword: formData.oldPassword,
          newpassword: formData.newPassword,
        },
        { token: currentUser.token }
      )
    );

    if (isUpdated) {
      navigate("/home");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen font-open-sans mb-4 bg-gray-100">
      <MetaData title="Change Password" />
      <div className="flex flex-col space-y-2 bg-white shadow-2xl rounded-2xl">
        <div className="flex flex-col justify-center p-6 md:p-12">
          <span className="mb-2 text-2xl md:text-4xl font-bold">
            Change Password
          </span>
          <span className="text-gray-500 text-sm mb-4">
            Please enter your details!!
          </span>

          <form
            onSubmit={handleSubmit}
            className="flex mr-3 flex-col text-sm gap-2"
          >
            {message && <p className="text-red-500 mt-2">{message}</p>}

            <div>
              <span className="mb-2 text-md">Email</span>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
              />
            </div>

            <div>
              <span className="mb-2 text-md">Old Password</span>
              <input
                type="password"
                id="oldPassword"
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
              />
            </div>
            <div>
              <span className="mb-2 text-md">New Password</span>
              <input
                type="password"
                id="newPassword"
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
              />
            </div>
            <div>
              <span className="mb-2 text-md">Confirm New Password</span>
              <input
                type="password"
                id="confirmNewPassword"
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
              />
            </div>

            <div className="flex flex-col">
              <button
                disabled={loading}
                type="submit"
                className="bg-cyan-600 text-white  font-semibold p-2 rounded-md hover:bg-cyan-700 transition duration-300 ease-in-out w-full"
              >
                {loading ? "Loading..." : "Change Password"}
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {isUpdated && (
            <p className="text-green-500 mt-2">Password updated successfully</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
