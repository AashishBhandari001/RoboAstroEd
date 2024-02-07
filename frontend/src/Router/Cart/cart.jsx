import React from "react";
import MetaData from "../Metadata/metaData";
import { useDispatch, useSelector } from "react-redux";
import CardItemCard from "../../Elements/CartItemCard";
import EmptyCart from "../../Elements/EmptyCart";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleCheckout = () => {
    // Redirect to checkout page if authenticated
    if (isAuthenticated) {
      navigate("/shipping"); // Use the navigate function
    } else {
      navigate("/account"); // Use the navigate function
    }
  };

  const calculateTotal = () => {
    let total = 0;

    cartItems.forEach((item) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
    });

    return total;
  };

  const vatAmount = () => {
    const vatRate = 0.13;
    const total = calculateTotal();
    const vatAmount = total * vatRate;
    return vatAmount;
  };

  const grandTotal = () => {
    const total = calculateTotal();
    const vat = vatAmount();
    const grandTotal = total + vat;
    return grandTotal;
  };

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

          {cartItems.length > 0 && (
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 mb-5">
              <div className="text-gray-700">
                <div className="mb-2 flex justify-between">
                  <p> total </p>
                  <p>{`NRP ${calculateTotal()}`}</p>
                </div>
                <div className="flex justify-between">
                  <p>Vat (13%)</p>
                  <p>{`NRP ${vatAmount()}`}</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold"> Grand Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">{`NRP ${grandTotal()}`}</p>
                    <p className="text-sm">including VAT</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 w-full rounded-md bg-cyan-600 py-1.5 font-medium text-white hover:bg-cyan-700"
              >
                Check out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
