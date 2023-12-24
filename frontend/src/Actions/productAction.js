import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../Constants/productConstants";
import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "../Redux/user/userSlice";

export const getProducts =
  (keyword = "", active = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });
      let link = `http://localhost:8080/api/product?keyword=${keyword}&page=${active}`;
      if (category) {
        link = `http://localhost:8080/api/product?keyword=${keyword}&page=${active}&category=${category}`;
      }
      const response = await axios.get(link);

      if (response && response.data) {
        dispatch({
          type: ALL_PRODUCTS_SUCCESS,
          payload: response.data,
          productCount: response.data.productCount,
        });
      } else {
        dispatch({
          type: ALL_PRODUCTS_FAIL,
          payload: "Failed to fetch products. Check your network connection.",
        });
      }
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// get all products for admin
export const getAdminProduct =
  ({ token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCTS_REQUEST });
      const response = await axios.get(
        "http://localhost:8080/api/product/admin/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response && response.data) {
        dispatch({
          type: ADMIN_PRODUCTS_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: ADMIN_PRODUCTS_FAIL,
          payload:
            "Failed to fetch admin products. Check your network connection.",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        dispatch(logoutStart());
        dispatch(logoutSuccess());
      }
      dispatch({
        type: ADMIN_PRODUCTS_FAIL,
        payload:
          "Failed to fetch admin products. Check your network connection.",
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const response = await axios.get(`http://localhost:8080/api/product/${id}`);

    if (response && response.data) {
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: response.data.product,
      });
    } else {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          "Failed to fetch product details. Check your network connection.",
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
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
