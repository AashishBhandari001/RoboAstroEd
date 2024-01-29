import React from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { khaltiPaymentCallbackAction } from "../../../Actions/orderAction";

function PaymentSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const pidx = searchParams.get("pidx");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      khaltiPaymentCallbackAction({
        pidx,
        orderId: id,
      })
    );
  };

  return (
    <div>
      <h1 className="mt-36 justify-center items-center font-bold">
        Your order has been placed Succesfully! Enjoy
        <button
          onClick={handleSubmit}
          className="p-2 bg-cyan-600 hover:bg-cyan-700"
        >
          Confirm order
        </button>
      </h1>
    </div>
  );
}

export default PaymentSuccess;
