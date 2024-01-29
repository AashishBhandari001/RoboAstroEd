import React, { useState, useEffect } from "react";
import { MdOutlineAccountTree } from "react-icons/md";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import { UPDATE_ORDER_RESET } from "../../Constants/orderConstants";

import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../Actions/orderAction";

const OrderDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");

  const handleDownloadPrint = async () => {
    // Capture the shipping info div as an image
    const orderDetail = document.getElementById("shippingInfoDiv");
    const canvas = await html2canvas(orderDetail);

    // Convert the image into a PDF
    const pdf = new jsPDF();
    pdf.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      0,
      0,
      pdf.internal.pageSize.width,
      canvas.height * (pdf.internal.pageSize.width / canvas.width)
    );

    // Download or open the PDF
    pdf.save("shipping_info.pdf");
  };

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("status", status);

    dispatch(updateOrder(id, formData, { token }));
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Fetch order details
        await dispatch(getOrderDetails(id, { token }));
      } catch (fetchError) {
        alert.error(fetchError.message);
        dispatch(clearErrors());
      }
    };
    // Fetch order details on component mount
    fetchOrderDetails();
  }, [dispatch, alert, id, token]);

  useEffect(() => {
    if (isUpdated) {
      alert.success("Order updated successfully");
      navigate("/admin/order");
      dispatch({ type: UPDATE_ORDER_RESET }); // Reset the isUpdated state
    }
  }, [dispatch, isUpdated, navigate]);

  return (
    <div className="container mx-auto ml-10">
      <div className="flex flex-row gap-10">
        <div className="flex flex-col">
          <div
            id="shippingInfoDiv"
            className="flex box-border shadow-lg p-6 bg-white rounded-lg gap-14"
          >
            <div className="flex flex-col">
              <h2 className="font-medium text-6xl pb-4 pt-4 ">Shipping Info</h2>
              <span>Name: {order.user.username}</span>
              <br />
              <span>Phone: {order.shippingInfo.phoneNo}</span>
              <br />
              <span>Address: {order.shippingInfo.address}</span>
              <br />
              <span>Country: {order.shippingInfo.country}</span>
              <br />
              <span>City: {order.shippingInfo.city}</span>
              <br />
              <span>State: {order.shippingInfo.state}</span>
              <br />
              <span>Zip Code: {order.shippingInfo.pinCode}</span>
              <br />

              <h2 className="font-medium text-6xl pb-4 pt-6 ">Order Items</h2>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item) => (
                    <tr key={item._id}>
                      <td className="border px-4 py-2">{item.name}</td>
                      <td className="border px-4 py-2">{item.quantity}</td>
                      <td className="border px-4 py-2">Rs. {item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col">
              <h2 className="font-medium text-6xl pb-4 pt-6 ">Payment</h2>
              <span>Method: {order.paymentType}</span>
              <br />
              <span>Item Price: Rs. {order.itemsPrice}</span>
              <br />
              <span>Shipping Price: Rs. {order.shippingPrice}</span>
              <br />
              <span>Tax Price: Rs. {order.taxPrice}</span>
              <br />
              <span>Total Price: Rs. {order.totalPrice}</span>
              <br />
              <span>
                Payment Status:{" "}
                <span
                  style={{
                    color:
                      order.paymentStatus === "Completed" ? "green" : "red",
                  }}
                >
                  {order.paymentStatus}
                </span>{" "}
              </span>
              <br />

              <h2 className="font-medium text-6xl pb-4 pt-6 ">Order Status</h2>
              <span>Status: {order.orderStatus}</span>

              {order.orderStatus === "Delivered" ? (
                <span className="text-green-600 mt-4">
                  Delivered on {order.deliveredAt}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <button
            onClick={handleDownloadPrint}
            className="mt-4 ring-4 font-normal text-white bg-cyan-600 ring-cyan-600 hover:bg-cyan-700  hover:ring-cyan-700 p-1 rounded-sm"
          >
            Download
          </button>
        </div>

        <div
          style={{
            display: order.orderStatus === "Delivered" ? "none" : "block",
          }}
          className="bg-white p-10 rounded-lg shadow-md justify-items-center"
        >
          <form onSubmit={updateOrderSubmitHandler}>
            <h1 className="font-medium text-6xl pb-4 pt-6">Process Order</h1>

            <div className="flex items-center">
              <label htmlFor="status_field" className="mr-2">
                <MdOutlineAccountTree size={30} />
              </label>
              <div className="flex flex-col">
                <span className="mb-1">Status:</span>
                <select
                  id="status_field"
                  className="form-control p-2 bg-white ring-2 ring-cyan-600"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Choose Status</option>
                  {order.orderStatus === "Processing" ? (
                    <option value="Shipped">Shipped</option>
                  ) : (
                    ""
                  )}
                  {order.orderStatus === "Shipped" ? (
                    <option value="Delivered">Delivered</option>
                  ) : (
                    ""
                  )}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-10 w-full shadow-sm ring-2 ring-cyan-600 hover:ring-cyan-700 text-white font-medium bg-cyan-600 hover:bg-cyan-700 p-1 rounded-sm"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
