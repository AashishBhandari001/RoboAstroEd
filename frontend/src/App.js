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
import Cart from "./Router/Cart";
import ShippingInfo from "./Router/ShippingInfo";
import ConfirmOrder from "./Router/ConfirmOrder/confirmOrder";

//course routes
import Course from "./Router/CoursePage/course";
import DetailCourse from "./Router/CoursePage/detailCourse";

//Admin Routes
import Adminlayout from "./Admin/AdminLayout/adminlayout";
import Dashboard from "./Admin/Dashboard";
import AdminProducts from "./Admin/AdminProducts/adminProducts";
import NewProduct from "./Admin/NewProduct";
import UpdateProduct from "./Admin/UpdateProduct";
import CreateCourses from "./Router/CoursePage/createCourse";
import AllCourse from "./Router/CoursePage/allCourse";
import UserList from "./Admin/UserList";
import UpdateUser from "./Admin/updateUser";

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
            {/* this is tutor route */}
            <Route path="/lessons" element={<Course />} />
            <Route path="/lessons/:id" element={<DetailCourse />} />
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
            <Route path="/shipping" element={<ShippingInfo />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
          </Route>
          <Route path="*" element={<NotFound />} />

          {isAuthenticated && currentUser && currentUser.role === "admin" && (
            <Route path="admin" element={<Adminlayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/product" element={<NewProduct />} />
              <Route path="/admin/product/:id" element={<UpdateProduct />} />
              <Route path="/admin/courses" element={<AllCourse />} />
              <Route path="/admin/createcourse" element={<CreateCourses />} />
              <Route path="/admin/user" element={<UserList />} />
              <Route path="/admin/user/:id" element={<UpdateUser />} />
            </Route>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
