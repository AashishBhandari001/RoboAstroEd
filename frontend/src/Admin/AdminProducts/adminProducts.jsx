import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct, clearErrors } from "../../Actions/productAction";
import { Link } from "react-router-dom";
import { MdEditCalendar, MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from "@mui/material";
import DashboardStatsGrid from "../DashboardStatsGrid/dashboardStatsGrid";

function AdminProducts() {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.products);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(
      getAdminProduct({
        token: currentUser.token,
      })
    );
  }, [dispatch, currentUser.token, error]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 270,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Link to={`/admin/product/${params.row.id}`}>
            <MdEditCalendar />
          </Link>

          <Button>
            <MdOutlineDeleteOutline />
          </Button>
        </div>
      ),
    },
  ];

  const rows = products
    ? products.map((item) => ({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      }))
    : [];

  return (
    <div>
      <div className="productcontainer">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableRowSelectionOnClick
          className="productlisttable"
          autoHeight
        />
      </div>
    </div>
  );
}

export default AdminProducts;
