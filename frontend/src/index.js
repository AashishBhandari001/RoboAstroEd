import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store, { persistor } from "./Redux/store.js";

import "./index.css";
import App from "./App";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { PersistGate } from "redux-persist/integration/react";

// import reportWebVitals from './reportWebVitals';

const options = {
  timeout: 5000,
  position: "top center", // Positioning at top center
  offset: "30px",
  transition: transitions.SCALE,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </AlertProvider>
  </Provider>
);
