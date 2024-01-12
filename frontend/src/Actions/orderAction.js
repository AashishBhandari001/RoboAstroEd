import axios from "axios";

import {
  KHALTI_PAYMENT_REQUEST,
  KHALTI_PAYMENT_SUCCESS,
  KHALTI_PAYMENT_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
} from "../Constants/orderConstants";

export const paymentAction = (paymentData) => async (dispatch) => {
  try {
    dispatch({ type: KHALTI_PAYMENT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `https://a.khalti.com/api/v2/epayment/initiate/`,
      paymentData,
      config
    );

    dispatch({
      type: KHALTI_PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: KHALTI_PAYMENT_FAIL,
      payload: error.response.data.message,
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
