import React, { useState, useEffect } from "react";
import MetaData from "../../Router/Metadata/metaData";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../Actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { CHANGE_PASSWORD_RESET } from "../../Constants/userConstants";
import { RxEyeOpen } from "react-icons/rx";
import { FaRegEyeSlash } from "react-icons/fa6";

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
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const { loading, error, isUpdated } = useSelector((state) => state.changePSW);
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdated) {
      setMessage("Password updated successfully");
      // Clear the form fields
      setFormData({
        email: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      // Reset the isUpdated state
      dispatch({ type: CHANGE_PASSWORD_RESET });
      const timer = setTimeout(() => {
        setMessage("");
        navigate("/home");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isUpdated, navigate, dispatch]);

  // Ensure navigate is set before rendering
  if (!currentUser) {
    navigate("/account");
    return null; // Return null to prevent rendering of the component
  }
  const id = currentUser._id;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleTogglePassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Form has been submitted
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
  };

  return (
    <div className="flex items-center justify-center h-screen font-open-sans mb-4 bg-gray-100">
      <MetaData title="Change Password" />
      <div className="flex flex-col space-y-2 bg-white shadow-2xl rounded-2xl max-w-md">
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
            {(message || error) && (
              <p
                className={`${
                  message ? "text-green-500" : "text-red-500"
                } mt-2`}
              >
                {message || (submitted && error) || ""}
              </p>
            )}

            <div>
              <span className="mb-2 text-md">Email</span>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                value={formData.email}
                required
                className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
              />
            </div>

            <div>
              <span className="mb-2 text-md">Old Password</span>
              <div className="relative">
                <input
                  type={showPassword.oldPassword ? "text" : "password"}
                  id="oldPassword"
                  onChange={handleChange}
                  value={formData.oldPassword}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
                />
                <span
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => handleTogglePassword("oldPassword")}
                >
                  {showPassword.oldPassword ? <FaRegEyeSlash /> : <RxEyeOpen />}
                </span>
              </div>
            </div>

            <div>
              <span className="mb-2 text-md">New Password</span>
              <div className="relative">
                <input
                  type={showPassword.newPassword ? "text" : "password"}
                  id="newPassword"
                  onChange={handleChange}
                  value={formData.newPassword}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
                />
                <span
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => handleTogglePassword("newPassword")}
                >
                  {showPassword.newPassword ? <FaRegEyeSlash /> : <RxEyeOpen />}
                </span>
              </div>
            </div>

            <div>
              <span className="mb-2 text-md">Confirm New Password</span>
              <div className="relative">
                <input
                  type={showPassword.confirmNewPassword ? "text" : "password"}
                  id="confirmNewPassword"
                  onChange={handleChange}
                  value={formData.confirmNewPassword}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
                />
                <span
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => handleTogglePassword("confirmNewPassword")}
                >
                  {showPassword.confirmNewPassword ? (
                    <FaRegEyeSlash />
                  ) : (
                    <RxEyeOpen />
                  )}
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <button
                disabled={loading}
                type="submit"
                className="bg-cyan-600 text-white mt-2 font-semibold p-2 rounded-md hover:bg-cyan-700 transition duration-300 ease-in-out w-full"
              >
                {loading ? "Loading..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
