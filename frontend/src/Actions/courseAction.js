import axios from "axios";

import {
  ALL_COURSE_REQUEST,
  ALL_COURSE_SUCCESS,
  ALL_COURSE_FAIL,
  ADMIN_COURSE_REQUEST,
  ADMIN_COURSE_SUCCESS,
  ADMIN_COURSE_FAIL,
} from "../Constants/courseConstants";

export const getAllCourses =
  (category = "", keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_COURSE_REQUEST });

      let link = `http://localhost:8080/api/course?keyword=${keyword}&category=${category}`;
      const response = await axios.get(link);

      console.log(response);

      if (response.data && response.data.courses) {
        dispatch({
          type: ALL_COURSE_SUCCESS,
          payload: response.data.courses,
        });
      } else {
        dispatch({
          type: ALL_COURSE_FAIL,
          payload: "Failed to fetch courses. Check your network connection.",
        });
      }
    } catch (error) {
      dispatch({
        type: ALL_COURSE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const createCourse =
  (myForm, { token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADMIN_COURSE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:8080/api/createcourse",
        myForm,
        config
      );

      dispatch({
        type: ADMIN_COURSE_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      console.error("Error creating course:", error);
      dispatch({
        type: ADMIN_COURSE_FAIL,
        payload: error.response
          ? error.response.data.message
          : "An unexpected error occurred",
      });
    }
  };
