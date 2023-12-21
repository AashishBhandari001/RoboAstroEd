import { Outlet } from "react-router-dom";
import React from "react";
import Sidebar from "../SideBar";
import Header from "../Header";
import Dashboard from "../Dashboard";

function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
