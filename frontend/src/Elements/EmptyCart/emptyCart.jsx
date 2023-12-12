import React from "react";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start items-center">
      <div className="flex flex-col justify-between items-center">
        <div className="justify-center items-center">
          <MdRemoveShoppingCart className="w-48 h-10" />
        </div>
        <p className="text-center text-lg font-semibold">
          No products added in the cart
        </p>

        <hr className="my-4" />

        <h2 className="text-center">
          Continue Shopping{" "}
          <Link
            to="/products"
            className="text-cyan-600 underline hover:text-cyan-800"
          >
            here
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default EmptyCart;
