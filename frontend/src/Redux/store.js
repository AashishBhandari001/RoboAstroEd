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
  productDetailsReducers,
} from "../Reducers/productReducer";
import userReducer from "./user/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartReducer } from "../Reducers/cartReducer";

const rootReducer = combineReducers({
  products: ProductReducers,
  productDetails: productDetailsReducers,
  user: userReducer,
  cart: cartReducer,
  newProduct: newProductReducer,
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
