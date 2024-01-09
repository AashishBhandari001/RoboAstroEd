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

export const courseReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case ALL_COURSE_REQUEST:
      return { loading: true, courses: [] };

    case DELETE_COURSE_REQUEST:
      return { ...state, loading: true };

    case ALL_COURSE_SUCCESS:
      return {
        loading: false,
        courses: action.payload,
      };

    case DELETE_COURSE_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case ALL_COURSE_FAIL:
    case DELETE_COURSE_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

//get course lectures reducer in admin page
export const courseLectureReducer = (state = { lectures: [] }, action) => {
  switch (action.type) {
    case GET_COURSE_LECTURE_REQUEST:
      return { loading: true, lectures: [] };

    case GET_COURSE_LECTURE_SUCCESS:
      return {
        loading: false,
        lectures: action.payload,
      };

    case GET_COURSE_LECTURE_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const adminReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case ADMIN_COURSE_REQUEST:
      return { loading: true };

    case ADMIN_COURSE_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };

    case ADMIN_COURSE_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null, message: null };

    default:
      return state;
  }
};

export const addLectureReducer = (state = { lectures: [] }, action) => {
  switch (action.type) {
    case ADD_LECTURE_REQUEST:
    case DELETE_LECTURE_REQUEST:
      return { loading: true };

    case ADD_LECTURE_SUCCESS:
    case DELETE_LECTURE_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };

    case ADD_LECTURE_FAIL:
    case DELETE_LECTURE_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null, message: null };

    default:
      return state;
  }
};
