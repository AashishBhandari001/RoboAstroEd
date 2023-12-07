import React from "react";
import MetaData from "../Metadata/metaData";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div>
      <MetaData title="Cart" />
      <div className="bg-gray-50 pt-20 mt-8 mb-5">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {/* cart container */}
            {cartItems &&
              cartItems.map((item) => (
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img
                    src={item.image}
                    alt="product-image"
                    className="md:w-36 md:h-20 rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">
                        {item.product}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                          {" "}
                          -{" "}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value="2"
                          min="1"
                        />
                        <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                          +
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm text-red-500 font-bold ">{`NPR ${item.price}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 mb-5">
            <div className="text-gray-700">
              <div className="mb-2 flex justify-between">
                <p>Subtotal</p>
                <p>$129.99</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>$4.99</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                  <p className="text-sm">including VAT</p>
                </div>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-cyan-600 py-1.5 font-medium text-white hover:bg-cyan-700">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
