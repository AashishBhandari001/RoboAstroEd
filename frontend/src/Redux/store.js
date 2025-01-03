import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  ProductReducers,
  newProductReducer,
  productReduser,
  productDetailsReducers,
} from "../Reducers/productReducer";
import {
  adminReducer,
  courseReducer,
  courseLectureReducer,
  addLectureReducer,
} from "../Reducers/courseReducer";
import userReducer from "./user/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartReducer } from "../Reducers/cartReducer";
import {
  allUsersReducer,
  userDetailsReducer,
  userUpdateDeleteReducer,
  changePasswordReducer,
  verifyEmailReducer,
} from "../Reducers/userReducer";
import {
  khaltiReducer,
  newOrderReducer,
  allOrdersReducer,
  orderReducer,
  orderDetailsReducer,
  khaltiCallbackReducer,
  myOrdersReducer,
  codConfirmReducer,
} from "../Reducers/orderReducer";

const rootReducer = combineReducers({
  products: ProductReducers,
  productDetails: productDetailsReducers, //product details reducer for admin

  user: userReducer,

  allUser: allUsersReducer, //all user reducer for admin
  changePSW: changePasswordReducer, //change password reducer
  userDetails: userDetailsReducer, //user details reducer for admin
  userUpdateDelete: userUpdateDeleteReducer, //update and delete user reducer for admin
  verifyEmail: verifyEmailReducer, //verify email reducer

  cart: cartReducer,
  newProduct: newProductReducer,
  product: productReduser, //delete and update product for admin

  courses: courseReducer,
  lectures: courseLectureReducer,

  admin: adminReducer,
  addlecture: addLectureReducer,

  newOrder: newOrderReducer,
  myOrders: myOrdersReducer, //my order reducer for user
  allOrders: allOrdersReducer, //all order reducer for admin
  order: orderReducer, //order update delete reducer for admin
  orderDetails: orderDetailsReducer, //order details reducer for admin
  codConfirm: codConfirmReducer,
  khalti: khaltiReducer,
  khaltiCallback: khaltiCallbackReducer,
});

const persistConfig = {
  key: "user",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  initialState,
  devTools: composeWithDevTools(applyMiddleware(...middleware)),
});

export const persistor = persistStore(store);

export default store;
