import {
  KHALTI_PAYMENT_REQUEST,
  KHALTI_PAYMENT_SUCCESS,
  KHALTI_PAYMENT_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
} from "../Constants/orderConstants";

export const paymentReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case KHALTI_PAYMENT_REQUEST:
      return {
        loading: true,
        order: [],
      };

    case KHALTI_PAYMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case KHALTI_PAYMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const newOrderReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
        success: false,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        success: true,
      };

    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};
