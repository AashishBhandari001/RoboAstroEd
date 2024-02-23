import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProduct,
  clearErrors,
  deleteProduct,
} from "../../Actions/productAction";
import { Link } from "react-router-dom";
import { MdEditCalendar, MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from "@mui/material";
import { DELETE_PRODUCTS_RESET } from "../../Constants/productConstants";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../../Router/Metadata/metaData";

function AdminProducts() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { products, error } = useSelector((state) => state.products);
  const { currentUser } = useSelector((state) => state.user);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id, currentUser.token));
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
      alert.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCTS_RESET });
    }

    dispatch(
      getAdminProduct({
        token: currentUser.token,
      })
    );
  }, [dispatch, currentUser.token, error, deleteError, isDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 250, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
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
          <Link to={`/admin/product/${params.row.id}`}>
            <MdEditCalendar size={18} />
          </Link>

          <Button onClick={() => deleteProductHandler(params.row.id)}>
            <MdOutlineDeleteOutline size={18} />
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
      <MetaData title="admin products" />
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

export default AdminProducts;
