import axios from "axios";

import {
  ALL_COURSE_REQUEST,
  ALL_COURSE_SUCCESS,
  ALL_COURSE_FAIL,
} from "../Constants/courseConstants";

export const getAllCourses =
  (category = "", keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_COURSE_REQUEST });

      let link = `http://localhost:8080/api/course?keyword=${keyword}&category=${category}`;
      const response = await axios.get(link);

      if (response && response.data) {
        dispatch({
          type: ALL_COURSE_SUCCESS,
          payload: response.courses,
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
