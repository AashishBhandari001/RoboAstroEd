import React, { useState } from "react";
import MetaData from "../Metadata/metaData";
import { useDispatch, useSelector } from "react-redux";
import { Trash2Icon } from "lucide-react";
import CardItemCard from "../../Elements/CartItemCard";
import EmptyCart from "../../Elements/EmptyCart";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { product } = useSelector((state) => state.productDetails);

  const [amount, setAmount] = useState(1);

  return (
    <div>
      <MetaData title="Cart" />
      <div className="bg-gray-50 pt-20 mt-8 mb-5">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="rounded-lg md:w-2/3">
              {cartItems &&
                cartItems.map((item) => (
                  <CardItemCard key={item.product} item={item} />
                ))}
            </div>
          )}

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 mb-5">
            <div className="text-gray-700">
              <div className="mb-2 flex justify-between">
                <p> total </p>
                <p>$129.99</p>
              </div>
              <div className="flex justify-between">
                <p>Vat (13%)</p>
                <p>$4.99</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold"> Grand Total</p>
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
