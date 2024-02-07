import React, { useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import CheckOutSteps from "../../../Elements/CheckOutSteps";

import { removeItemsFromCart } from "../../../Actions/cartAction";

import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { khaltiPaymentCallbackAction } from "../../../Actions/orderAction";
import checkBox from "../../../Assets/checkbox.png";

function PaymentSuccess() {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [searchParams, setSearchParams] = useSearchParams();
  const pidx = searchParams.get("pidx");
  const { id } = useParams();

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmOrder = async () => {
    try {
      await dispatch(
        khaltiPaymentCallbackAction({
          pidx,
          orderId: id,
        })
      );
      setIsConfirmed(true);
      alert.success("Order confirmed successfully!");

      cartItems.forEach((item) => {
        dispatch(removeItemsFromCart(item.product));
      });
    } catch (error) {
      alert.error("Failed to confirm order. Please try again.");
    }
  };

  const handleMyOrder = () => {
    navigate(`/my-orders`);
  };

  return (
    <div className="mt-32">
      <CheckOutSteps activeStep={3} />

      <div className="flex flex-col items-center justify-center mt-28 mb-28">
        <img
          src={checkBox}
          alt="checkmark"
          className="w-40 h-40 mb-4 bg-transparent"
        />
        <h1 className="text-13xl font-bold mb-8 mt-10">
          Payment successful! 🎉
        </h1>
        {!isConfirmed && (
          <button
            onClick={handleConfirmOrder}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-full text-xl"
          >
            Place order
          </button>
        )}
        {isConfirmed && (
          <button
            onClick={handleMyOrder}
            className="mt-4 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-full text-xl"
          >
            My Orders
          </button>
        )}
      </div>
    </div>
  );
}

export default PaymentSuccess;
