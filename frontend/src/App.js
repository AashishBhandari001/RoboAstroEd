import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Router/Layout";
import Home from "./Router/Home";
import Contact from "./Components/ContactUs";
import Error from "./Router/Error";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import PasswordReset from "./Components/ForgetPassword/passwordreset";
import ForgetPassword from "./Components/ForgetPassword/forgetpassword";
// import ProductList from "./Components/Features/Product/ProductList";

function NotFound() {
  return <Error />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Account" element={<Login />} />
            <Route path="/Register" element={<Signup />} />
            <Route path="/PasswordReset" element={<PasswordReset />} />
            <Route path="/forgetpassword/:id/:token" element={<ForgetPassword />} />

          </Route>
          {/* Define a catch-all route for not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
