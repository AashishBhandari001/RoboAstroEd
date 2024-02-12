import axios from "axios";

import {
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  Verify_EMAIL_REQUEST,
  Verify_EMAIL_SUCCESS,
  Verify_EMAIL_FAIL,
  CLEAR_ERRORS,
} from "../Constants/userConstants";

const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

//get all user for admin
export const getAllUsers =
  ({ token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${backendBaseUrl}/api/auth/admin/users`,
        config
      );

      dispatch({
        type: ALL_USERS_SUCCESS,
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: ALL_USERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//get user details for admin
export const getUserDetails =
  (id, { token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${backendBaseUrl}/api/auth/admin/users/${id}`,
        config
      );

      console.log(data);

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//update user details for admin
export const updateUser =
  (id, userData, { token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${backendBaseUrl}/api/auth/admin/users/${id}`,
        userData,
        config
      );

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//delete user for admin
export const deleteUser =
  (id, { token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(
        `${backendBaseUrl}/api/auth/admin/users/${id}`,
        config
      );

      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//change password for user
export const changePassword =
  (id, formData, { token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: CHANGE_PASSWORD_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${backendBaseUrl}/api/auth/change-password/${id}`,
        formData,
        config
      );

      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,

        payload: error.response.data.error,
      });
    }
  };

//verify email for user
export const verifyEmail = (token) => async (dispatch) => {
  try {
    dispatch({ type: Verify_EMAIL_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${backendBaseUrl}/api/auth/verify-email?token=${token}`,
      config
    );

    dispatch({
      type: Verify_EMAIL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Verify_EMAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
