import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
