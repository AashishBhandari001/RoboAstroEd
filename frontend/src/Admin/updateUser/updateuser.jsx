import React from "react";
import { useState, useEffect } from "react";
import {
  clearErrors,
  updateUser,
  getUserDetails,
} from "../../Actions/userAction";
import { TbCategory2 } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UpdateUser() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const { error, user } = useSelector((state) => state.userDetails);

  const { loading, isUpdated } = useSelector((state) => state.userUpdateDelete);

  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    dispatch(getUserDetails(id, { token: currentUser.token }));

    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, id, currentUser.token]);

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id, { token: currentUser.token }));
    } else {
      setName(user.username);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");
      navigate("/admin/user");
    }
  }, [
    dispatch,
    id,
    currentUser.token,
    user,
    error,
    isUpdated,
    alert,
    navigate,
  ]);

  const updateUserSubmitHandler = (e) => {
    console.log("createProductSubmitHandler called");
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", username);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(id, myForm, { token: currentUser.token }));
  };

  return (
    <div className="dashboard ">
      <form
        onSubmit={updateUserSubmitHandler}
        className="max-w-md mx-auto  border-spacing-1 md:mt-10 shadow-xl p-10 "
      >
        <h1 className="text-3xl font-bold mb-6">Update User</h1>

        {/* Product Name */}
        <div className="mb-4 flex">
          <FaUserAstronaut size={30} className="mr-2" />
          <input
            type="text"
            placeholder="Name"
            id="UserName"
            required
            value={username}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>

        {/* Price */}
        <div className="mb-4 flex">
          <MdOutlineEmail size={30} className="mr-2" />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>

        {/* Category */}
        <div className="mb-4 flex">
          <TbCategory2 size={30} className="mr-2" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded w-full py-2 px-3"
          >
            <option value="">Choose Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-cyan-700 text-white font-medium py-2 w-full rounded hover:bg-cyan-800"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
