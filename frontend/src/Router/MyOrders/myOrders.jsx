import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { TbListDetails } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { clearErrors, myOrders } from "../../Actions/orderAction";
import Loading from "../../Elements/Loading";
import MetaData from "../Metadata/metaData";
import { useAlert } from "react-alert";

function MyOrders() {
  const { orders, loading, error } = useSelector((state) => state.myOrders);
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;

  const dispatch = useDispatch();
  const alert = useAlert();

  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 1,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.row.status === "Processing"
                ? " text-cyan-600"
                : params.row.status === "Shipped"
                ? " text-black"
                : params.row.status === "Delivered"
                ? " text-green-600"
                : " text-red-600"
            } px-2 py-1 rounded-md`}
          >
            {params.row.status}
          </div>
        );
      },
    },
    {
      field: "itemQty",
      headerName: "Items Qty",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 250,
      flex: 1,
    },

    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <NavLink
            to={`/my-orders/${params.row.id}`}
            className="flex items-center justify-center hover:text-[#FF4F1D] "
          >
            <TbListDetails size={20} className="text-cyan-600" /> &nbsp;
            <Typography variant="body4">View</Typography>
          </NavLink>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.map((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemQty: item.orderItems.length,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders({ token }));
  }, [dispatch, alert, error]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-24 mb-10">
      <MetaData title={"My Orders"} />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-between items-start">
          <div className="mt-5 mb-6 md:ml-8 ">
            <Typography variant="h4" className="font-medium text-center">
              My Orders
            </Typography>
          </div>
          <DataGrid
            rows={rows.reverse()}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            className="bg-white shadow-md md:ml-10"
            style={{ width: "90%" }}
          />
        </div>
      )}
    </div>
  );
}

export default MyOrders;
