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
import Products from "./Router/Productpage";
import ProductDetails from "./Router/ProductDetails";
import { useSelector } from "react-redux";
import Admin from "./Router/Admin/admin";
import Cart from "./Router/Cart";

function NotFound() {
  return <Error />;
}

function App() {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/PasswordReset" element={<PasswordReset />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:keyword" element={<Products />} />
            <Route
              path="/forgetpassword/:id/:token"
              element={<ForgetPassword />}
            />
          </Route>
          {/* Define a catch-all route for not found */}
          <Route path="*" element={<NotFound />} />

          {isAuthenticated && currentUser && currentUser.role === "admin" && (
            <Route path="/admin" element={<Admin />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
