import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { ChakraProvider } from "@chakra-ui/react";

function Layout({ children }) {
  return (
    <>
      <ChakraProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default Layout;
