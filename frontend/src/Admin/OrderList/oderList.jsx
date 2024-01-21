import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../Actions/productAction";
import { Link } from "react-router-dom";
import { MdEditCalendar, MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { getAllOrders } from "../../Actions/orderAction";

function OrderList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, orders } = useSelector((state) => state.allOrders);

  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    // dispatch(deleteProduct(id, currentUser.token));
  };

  useEffect(() => {
    // if (error) {
    //   dispatch(clearErrors());
    // }

    // if (deleteError) {
    //   alert.error(deleteError);
    //   dispatch(clearErrors());
    // }

    // if (isDeleted) {
    //   alert.success("Product Deleted Successfully");
    //   dispatch({ type: DELETE_PRODUCTS_RESET });
    // }

    dispatch(
      getAllOrders({
        token,
      })
    );
  }, [dispatch, token]);

  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      minWidth: 250,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 300,
      flex: 0.5,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "paymentType",
      headerName: "Payment Type",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "itemsQty",
      headerName: "items Qty",
      type: "number",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 300,
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
        <div className="flex flex-row">
          <Link to={`/admin/order/${params.row.id}`}>
            <MdEditCalendar size={18} />
          </Link>

          <Button onClick={() => deleteProductHandler(params.row.id)}>
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

export default OrderList;
