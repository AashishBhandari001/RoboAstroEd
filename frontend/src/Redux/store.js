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
} from "../Reducers/userReducer";

const rootReducer = combineReducers({
  products: ProductReducers,
  productDetails: productDetailsReducers,
  user: userReducer,
  allUser: allUsersReducer, //all user reducer for admin
  userDetails: userDetailsReducer, //user details reducer for admin
  userUpdateDelete: userUpdateDeleteReducer, //update and delete user reducer for admin
  cart: cartReducer,
  newProduct: newProductReducer,
  product: productReduser, //delete and update product for admin
  courses: courseReducer,
  lectures: courseLectureReducer,
  admin: adminReducer,
  addlecture: addLectureReducer,
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
