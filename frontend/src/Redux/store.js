import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
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
  middleware,
  initialState,
  devTools: composeWithDevTools(applyMiddleware(...middleware)),
});

export default store;
