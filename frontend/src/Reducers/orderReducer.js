import {
  KHALTI_PAYMENT_REQUEST,
  KHALTI_PAYMENT_SUCCESS,
  KHALTI_PAYMENT_FAIL,
  KHALTI_PAYMENT_CALLBACK_REQUEST,
  KHALTI_PAYMENT_CALLBACK_SUCCESS,
  KHALTI_PAYMENT_CALLBACK_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  COD_CONFIRM_FAIL,
  COD_CONFIRM_REQUEST,
  COD_CONFIRM_SUCCESS,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_RESET,
  DELETE_ORDER_FAIL,
  GENERATE_INVOICE_REQUEST,
  GENERATE_INVOICE_SUCCESS,
  GENERATE_INVOICE_FAIL,
  CLEAR_ERRORS,
} from "../Constants/orderConstants";

export const khaltiReducer = (state = { order: [] }, action) => {
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

//MY ooders for user
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
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

export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Order details
export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case GET_ORDER_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const codConfirmReducer = (state = {}, action) => {
  switch (action.type) {
    case COD_CONFIRM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case COD_CONFIRM_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case COD_CONFIRM_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const khaltiCallbackReducer = (state = {}, action) => {
  switch (action.type) {
    case KHALTI_PAYMENT_CALLBACK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case KHALTI_PAYMENT_CALLBACK_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case KHALTI_PAYMENT_CALLBACK_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

//generate invoice
export const generateInvoiceReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case GENERATE_INVOICE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GENERATE_INVOICE_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case GENERATE_INVOICE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
