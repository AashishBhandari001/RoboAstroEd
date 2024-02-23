import React, { useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import CheckOutSteps from "../../Elements/CheckOutSteps";
import checkbox from "../../Assets/checkbox.png";
import MetaData from "../../Router/Metadata/metaData";

function CodOrderSuccess() {
  const navigate = useNavigate();

  const handleMyOrder = () => {
    navigate(`/my-orders`);
  };
  return (
    <div className="mt-32">
      <MetaData title="Order Success" />

      <CheckOutSteps activeStep={3} />

      <div className="flex flex-col items-center justify-center mt-28 mb-28">
        <img
          src={checkbox}
          alt="checkmark"
          className="w-40 h-40 mb-4 bg-transparent"
        />
        <h1 className="text-13xl font-bold mb-8 mt-10">
          "Your order has been placed successfully! "🎉
        </h1>

        <button
          onClick={handleMyOrder}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-full text-xl"
        >
          My Orders
        </button>
      </div>
    </div>
  );
}

export default CodOrderSuccess;
