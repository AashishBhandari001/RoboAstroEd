import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { getOrderDetails, clearErrors } from "../../Actions/orderAction";
import MetaData from "../Metadata/metaData";
import Loading from "../../Elements/Loading";

const MyOrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { id } = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        await dispatch(getOrderDetails(id, { token }));
      } catch (fetchError) {
        alert.error(fetchError.message);
        dispatch(clearErrors());
      }
    };

    fetchOrderDetails();
  }, [dispatch, alert, id, token]);

  const handleShopAgain = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="flex justify-center items-center h-full">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-4xl">
          <MetaData title={"Order Details"} />
          <div className="p-8 bg-white shadow-lg rounded-lg mt-24 mb-10">
            <h1 className="text-3xl font-semibold mb-8">Order # {order._id}</h1>
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-2">Shipping Info</h4>
              <p>
                <b>Name:</b> {order.user && order.user.username}
              </p>
              <p>
                <b>Phone:</b> {order.shippingInfo && order.shippingInfo.phoneNo}
              </p>
              <p className="mb-2">
                <b>Address: </b>
                {order.shippingInfo &&
                  `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`}
              </p>
            </div>
            <hr className="my-6" />
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-2">Payment</h4>
              <p>
                <b>Total Amount:</b> NPR <b> {order.totalPrice}</b>
              </p>
              <p>
                <b>Method:</b> {order.user && order.paymentType}
              </p>
              <p>
                <b>Date:</b> {order.user && order.paidAt}
              </p>
            </div>
            <hr className="my-6" />
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-2">Order Status:</h4>
              <p
                className={
                  order.orderStatus &&
                  String(order.orderStatus).includes("Delivered")
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                <b>{order.orderStatus}</b>
              </p>
            </div>
            <hr className="my-6" />
            <div>
              <h4 className="text-xl font-semibold mb-2">Order Items:</h4>
              <div className="grid grid-cols-1 gap-4">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div
                      key={item.product}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-shrink-0 mr-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-20 object-contain"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold">
                          <a href={`/product/${item.product}`}>{item.name}</a>
                        </p>
                        <p>
                          {item.quantity} x ${item.price} ={" "}
                          <b>${(item.quantity * item.price).toFixed(2)}</b>
                        </p>
                      </div>
                      <button
                        className="text-white bg-cyan-600 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-700 rounded"
                        onClick={() => handleShopAgain(item.product)}
                      >
                        Shop Again
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrderDetails;
