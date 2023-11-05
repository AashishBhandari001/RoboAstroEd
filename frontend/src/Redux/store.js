import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductReducers } from "../Reducers/productReducer";

const rootReducer = combineReducers({
  products: ProductReducers,
});

const initialState = {};

const middleware = [thunk]; // Array of middleware - in this case, just using Redux Thunk

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== "production", // DevTools configuration
  preloadedState: initialState, // Assign initial state if needed
});

export default store;
