import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCTS_REQUEST,
  NEW_PRODUCTS_SUCCESS,
  NEW_PRODUCTS_FAIL,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAIL,
  UPDATE_PRODUCTS_REQUEST,
  UPDATE_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_FAIL,
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
            "Content-Type": "multipart/form-data",
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

// create new product for admin
export const createProduct =
  ({ token }, productData) =>
  async (dispatch) => {
    console.log("redux");
    productData.forEach((v) => console.log(v));
    try {
      dispatch({ type: NEW_PRODUCTS_REQUEST });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data;",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:8080/api/product/admin/product/new",
        productData,
        config
      );

      if (response && response.data) {
        dispatch({
          type: NEW_PRODUCTS_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: NEW_PRODUCTS_FAIL,
          payload: "Failed to create product. Check your network connection.",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        dispatch(logoutStart());
        dispatch(logoutSuccess());
        console.log("401");
      }
      dispatch({
        type: ADMIN_PRODUCTS_FAIL,
        payload:
          "Failed to fetch admin products. Check your network connection.",
      });
    }
  };

// update product for admin
export const updateProduct =
  ({ token, productData, id }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCTS_REQUEST });

      const response = await axios.put(
        `http://localhost:8080/api/product/admin/product/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response && response.data) {
        dispatch({
          type: UPDATE_PRODUCTS_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: UPDATE_PRODUCTS_FAIL,
          payload: "Failed to update product. Check your network connection.",
        });
      }
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(logoutStart());
        dispatch(logoutSuccess());
        console.log("401");
      }
      dispatch({
        type: UPDATE_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// delete product for admin
export const deleteProduct = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCTS_REQUEST });
    const response = await axios.delete(
      `http://localhost:8080/api/product/admin/product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response && response.data) {
      dispatch({
        type: DELETE_PRODUCTS_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: DELETE_PRODUCTS_FAIL,
        payload: "Failed to delete product. Check your network connection.",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      dispatch(logoutStart());
      dispatch(logoutSuccess());
    }
    dispatch({
      type: DELETE_PRODUCTS_FAIL,
      payload: error.response.data.message,
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
