import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdEditCalendar, MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllUsers, clearErrors, deleteUser } from "../../Actions/userAction";
import { DELETE_USER_RESET } from "../../Constants/userConstants";
import { useAlert } from "react-alert";

function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { error, users } = useSelector((state) => state.allUser);
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.userUpdateDelete);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id, { token }));
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
      alert.success(message);
      navigate("/admin/user");

      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers({ token }));
  }, [
    dispatch,
    currentUser.token,
    error,
    deleteError,
    isDeleted,
    navigate,
    message,
  ]);

  const columns = [
    { field: "id", headerName: "User Id", minWidth: 250, flex: 0 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 250,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <div className="flex flex-row">
          <Link to={`/admin/user/${params.row.id}`}>
            <MdEditCalendar size={18} />
          </Link>

          <Button onClick={() => deleteUserHandler(params.row.id)}>
            <MdOutlineDeleteOutline size={18} />
          </Button>
        </div>
      ),
    },
  ];

  const rows = users
    ? users.map((item) => ({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.username,
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

export default UserList;
