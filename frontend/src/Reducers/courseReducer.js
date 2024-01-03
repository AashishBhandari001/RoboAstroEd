import {
  ALL_COURSE_REQUEST,
  ALL_COURSE_SUCCESS,
  ALL_COURSE_FAIL,
  ADMIN_COURSE_REQUEST,
  ADMIN_COURSE_SUCCESS,
  ADMIN_COURSE_FAIL,
  CLEAR_ERRORS,
} from "../Constants/courseConstants";

export const courseReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case ALL_COURSE_REQUEST:
      return { loading: true, courses: [] };

    case ALL_COURSE_SUCCESS:
      return {
        loading: false,
        courses: action.payload,
      };

    case ALL_COURSE_FAIL:
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
