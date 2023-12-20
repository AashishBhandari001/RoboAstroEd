import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="h-screen bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">This is my sidebar</h1>
      </div>

      <Link to="/admin/products">
        <p>products</p>{" "}
      </Link>


      <Link to="/admin/dashboard">
        <p>Dashboard</p>{" "}
      </Link>
    </div>
  );
}

export default Sidebar;
