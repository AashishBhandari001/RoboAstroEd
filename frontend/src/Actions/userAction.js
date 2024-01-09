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
  CLEAR_ERRORS,
} from "../Constants/userConstants";

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
        "http://localhost:8080/api/auth/admin/users",
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
        `http://localhost:8080/api/auth/admin/users/${id}`,
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
        `http://localhost:8080/api/auth/admin/users/${id}`,
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
        `http://localhost:8080/api/auth/admin/users/${id}`,
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

// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
