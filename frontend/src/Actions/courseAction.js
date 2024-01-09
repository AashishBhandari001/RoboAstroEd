import axios from "axios";

import {
  ALL_COURSE_REQUEST,
  ALL_COURSE_SUCCESS,
  ALL_COURSE_FAIL,
  ADMIN_COURSE_REQUEST,
  ADMIN_COURSE_SUCCESS,
  ADMIN_COURSE_FAIL,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
  GET_COURSE_LECTURE_REQUEST,
  GET_COURSE_LECTURE_SUCCESS,
  GET_COURSE_LECTURE_FAIL,
  ADD_LECTURE_REQUEST,
  ADD_LECTURE_SUCCESS,
  ADD_LECTURE_FAIL,
  DELETE_LECTURE_REQUEST,
  DELETE_LECTURE_SUCCESS,
  DELETE_LECTURE_FAIL,
  CLEAR_ERRORS,
} from "../Constants/courseConstants";

export const getAllCourses =
  (category = "", keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_COURSE_REQUEST });

      let link = `http://localhost:8080/api/course?keyword=${keyword}&category=${category}`;
      const response = await axios.get(link);

      dispatch({
        type: ALL_COURSE_SUCCESS,
        payload: response.data.courses,
      });
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

export const getCourseLectures =
  (id, { token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_COURSE_LECTURE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:8080/api/course/${id}`,
        config
      );

      dispatch({
        type: GET_COURSE_LECTURE_SUCCESS,
        payload: data.lectures,
      });
    } catch (error) {
      dispatch({
        type: GET_COURSE_LECTURE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteCourse =
  (id, { token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: DELETE_COURSE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(
        `http://localhost:8080/api/course/${id}`,
        config
      );

      dispatch({
        type: DELETE_COURSE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_COURSE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const addLecture =
  (id, formdata, { token }) =>
  async (dispatch) => {
    console.log("formdata", formdata);
    try {
      dispatch({ type: ADD_LECTURE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:8080/api/course/${id}`,
        formdata,
        config
      );

      dispatch({
        type: ADD_LECTURE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: ADD_LECTURE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteLecture =
  (courseId, lectureId, { token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: DELETE_LECTURE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(
        `http://localhost:8080/api/lecture?courseId=${courseId}&lectureId=${lectureId}`,
        config
      );

      dispatch({
        type: DELETE_LECTURE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_LECTURE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
