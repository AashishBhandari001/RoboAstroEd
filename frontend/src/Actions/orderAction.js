import axios from "axios";

import {
  KHALTI_PAYMENT_REQUEST,
  KHALTI_PAYMENT_SUCCESS,
  KHALTI_PAYMENT_FAIL,
  KHALTI_PAYMENT_CALLBACK_REQUEST,
  KHALTI_PAYMENT_CALLBACK_SUCCESS,
  KHALTI_PAYMENT_CALLBACK_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_RESET,
  DELETE_ORDER_FAIL,
  COD_CONFIRM_REQUEST,
  COD_CONFIRM_SUCCESS,
  COD_CONFIRM_FAIL,
  CLEAR_ERRORS,
} from "../Constants/orderConstants";

// Inside khaltiPaymentAction
export const khaltiPaymentAction = (paymentData) => async (dispatch) => {
  try {
    dispatch({ type: KHALTI_PAYMENT_REQUEST });

    const { data } = await axios.post(
      `http://localhost:8080/api/order/${paymentData.orderId}/initiate-payment`,
      paymentData
    );

    dispatch({
      type: KHALTI_PAYMENT_SUCCESS,
      payload: data,
    });

    // Redirect user to Khalti payment URL
    window.location.href = data.payment_url;
  } catch (error) {
    console.error(error);
    dispatch({
      type: KHALTI_PAYMENT_FAIL,
      payload: error.response
        ? error.response.data.message
        : "An error occurred",
    });
  }
};

export const newOrderAction =
  (orderData, { token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:8080/api/order/new`,
        orderData,
        config
      );

      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//get my orders user
export const myOrders =
  ({ token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: MY_ORDERS_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:8080/api/order/me",
        config
      );

      dispatch({
        type: MY_ORDERS_SUCCESS,
        payload: data.orders,
      });
    } catch (error) {
      dispatch({
        type: MY_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//get all orders admin
export const getAllOrders =
  ({ token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDERS_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:8080/api/order/admin/orders`,
        config
      );

      dispatch({
        type: ALL_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//get order details admin
export const getOrderDetails =
  (id, { token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ORDER_DETAILS_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:8080/api/order/${id}`,
        config
      );

      dispatch({
        type: GET_ORDER_DETAILS_SUCCESS,
        payload: data.order,
      });
    } catch (error) {
      dispatch({
        type: GET_ORDER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//update order admin
export const updateOrder =
  (id, orderData, { token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:8080/api/order/admin/orders/${id}`,
        orderData,
        config
      );

      dispatch({
        type: UPDATE_ORDER_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//delete order admin
export const deleteOrder =
  (id, { token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: DELETE_ORDER_REQUEST });

      const { data } = await axios.delete(
        `http://localhost:8080/api/order/admin/orders/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: DELETE_ORDER_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//confirm order for COD
export const confirmOrder =
  (id, { token }) =>
  async (dispatch) => {
    try {
      console.log("token in action", token);
      dispatch({ type: COD_CONFIRM_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:8080/api/order/${id}/confirm`,
        config
      );

      dispatch({
        type: COD_CONFIRM_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: COD_CONFIRM_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const khaltiPaymentCallbackAction =
  (paymentData) => async (dispatch) => {
    try {
      dispatch({ type: KHALTI_PAYMENT_CALLBACK_REQUEST });

      const { data } = await axios.post(
        `http://localhost:8080/api/order/${paymentData.orderId}/verify-payment`,
        paymentData
      );

      dispatch({
        type: KHALTI_PAYMENT_CALLBACK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: KHALTI_PAYMENT_CALLBACK_FAIL,
        payload: error.response
          ? error.response.data.message
          : "An error occurred",
      });
    }
  };
