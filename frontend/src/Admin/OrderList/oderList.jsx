import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../Actions/orderAction";
import { DELETE_ORDER_RESET } from "../../Constants/orderConstants";
import MetaData from "../../Router/Metadata/metaData";

function OrderList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, orders } = useSelector((state) => state.allOrders);

  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id, { token }));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/order");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(
      getAllOrders({
        token,
      })
    );
  }, [dispatch, token, error, deleteError, isDeleted, navigate]);

  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      minWidth: 250,
      flex: 0.3,
    },
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
                ? " text-black"
                : params.row.status === "Shipped"
                ? " text-blue-600"
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
      field: "paymentType",
      headerName: "Payment Type",
      minWidth: 200,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.row.paymentType === "Khalti"
                ? "text-green-600"
                : "text-black"
            } px-2 py-1 rounded-md`}
          >
            {params.row.paymentType}
          </div>
        );
      },
    },

    {
      field: "itemsQty",
      headerName: "items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 250,
      flex: 0.2,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.2,
      sortable: false,
      renderCell: (params) => (
        <div className="flex flex-row">
          <Link to={`/admin/order/${params.row.id}`}>
            <MdOutlineEdit size={18} />
          </Link>

          <Button onClick={() => deleteOrderHandler(params.row.id)}>
            <MdOutlineDeleteOutline size={18} />
          </Button>
        </div>
      ),
    },
  ];

  const rows =
    orders && orders.orders
      ? orders.orders.map((item) => ({
          id: item._id,
          itemsQty: item.orderItems ? item.orderItems.length : 0,
          paymentType: item.paymentType,
          amount: item.totalPrice || 0,
          status: item.orderStatus || "",
        }))
      : [];

  return (
    <div>
      <MetaData title="All Order" />

      <div className="productcontainer">
        <DataGrid
          rows={rows.reverse()}
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

export default OrderList;
