import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { ChakraProvider } from "@chakra-ui/react";

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
