import React, { useState } from "react";
import CheckOutSteps from "../../Elements/CheckOutSteps";
import MetaData from "../Metadata/metaData";
import cash_In_Delevery from "../.././Assets/cashdelevery.png";
import Khalti from "../.././Assets/khalti.png";
import ESEWA from "../.././Assets/eSewa.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  esewaPaymentAction,
  newOrderAction,
  khaltiPaymentAction,
} from "../../Actions/orderAction";
import { useAlert } from "react-alert";

function PaymentMethod() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const { error, success, loading } = useSelector((state) => state.newOrder);

  const subTotal = () => {
    let total = 0;

    cartItems.forEach((item) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
    });

    return total;
  };

  const shippingCharges = subTotal() < 1000 ? 0 : 100;

  const vatAmmount = () => {
    const vat = 0.13;
    const total = subTotal();
    const vatAmount = total * vat;
    return vatAmount;
  };

  const grandTotal = () => {
    const total = subTotal();
    const vat = vatAmmount();
    const grandTotal = total + vat + shippingCharges;
    return grandTotal;
  };

  const grandTotalInPaisa = () => {
    const total = subTotal();
    const vat = vatAmmount();
    const grandTotalRupees = total + vat + shippingCharges;

    // Convert rupees to paisa by multiplying by 100
    const grandTotalPaisa = grandTotalRupees * 100;

    return grandTotalPaisa;
  };

  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  //post data
  const orderItemsData = cartItems.map((item) => ({
    name: item.name,
    price: item.price,
    image: item.image,
    quantity: item.quantity,
    product: item.product,
  }));

  const shippingInfoData = {
    address: shippingInfo.address,
    city: shippingInfo.city,
    phoneNo: shippingInfo.phoneNo,
    pinCode: shippingInfo.pinCode,
    country: shippingInfo.country,
    state: shippingInfo.state,
  };

  const handlePlaceOrder = () => {
    if (selectedPayment === "Khalti") {
      const paymentData = {
        return_url: "http://localhost:3000/payment/success",
        website_url: "http://localhost:3000",
        amount: grandTotalInPaisa(),
        purchase_order_id: "PO-" + Math.floor(Math.random() * 100000),
        purchase_order_name: "Purchase Order",
        customer_info: {
          name: currentUser.username,
          email: currentUser.email,
          phone: shippingInfo.phoneNo,
        },
      };
      dispatch(khaltiPaymentAction(paymentData));
    } else if (selectedPayment === "CashOnDelivery") {
      const codPaymentId = "COD-" + Math.floor(Math.random() * 100000);

      const orderData = {
        shippingInfo: shippingInfoData,
        orderItems: orderItemsData,
        user: currentUser.id,
        paymentType: "COD",
        paidAt: new Date(),
        itemsPrice: subTotal(),
        taxPrice: vatAmmount(),
        shippingPrice: shippingCharges,
        totalPrice: grandTotal(),
      };

      dispatch(newOrderAction(orderData, { token: currentUser.token }));

      if (error) {
        alert.error("Cannot place order, PLease try again later");
      } else {
        alert.success("order placed successfully");
        navigate("/success");
      }
    }
  };

  return (
    <div className="mt-32 mb-32">
      <MetaData title={"Payment Method"} />
      <CheckOutSteps activeStep={2} />
      <div className="">
        <section className="max-w-[900px] mx-auto pt-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-00 mb-8">
            Please Select Payment Method:
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Payment method: Cash on Delivery */}
            <label htmlFor="payment1" className="cursor-pointer">
              <input
                type="radio"
                id="payment1"
                name="payment"
                className="peer hidden"
                onChange={() => handlePaymentSelection("CashOnDelivery")}
              />

              <div className="flex items-center justify-center p-5 pr-16 sm:p-8 gap-5 sm:h-40 w-full bg-white border-2 border-gray-200 rounded-md transition peer-checked:border-cyan-600 peer-checked:shadow-lg peer-checked:-translate-y-1">
                <div className="relative overflow-hidden rounded-md shadow-md w-full h-full">
                  <img
                    src={cash_In_Delevery}
                    alt="Cash on Delivery image"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </label>

            {/* Payment method: Khalti */}
            <label htmlFor="payment2" className="cursor-pointer">
              <input
                type="radio"
                id="payment2"
                name="payment"
                className="peer hidden"
                onChange={() => handlePaymentSelection("Khalti")}
              />

              <div className="flex items-center justify-center p-5 pr-16 sm:p-8 gap-5 sm:h-40 w-full bg-white border-2 border-gray-200 rounded-md transition peer-checked:border-cyan-600 peer-checked:shadow-lg peer-checked:-translate-y-1">
                <div className="relative overflow-hidden rounded-md shadow-md w-full h-full">
                  <img
                    src={Khalti}
                    alt="Khalti payment image"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </label>

            <div className="flex flex-col sm:col-span-3 mt-8 bg-white p-6 rounded-md shadow-md max-w-lg justify-center">
              {/* Total amount section */}
              <div>
                <h2 className="text-xl font-normal mb-4">Total Amount</h2>
                <div className="flex flex-col space-y-2">
                  <p>
                    <span className="font-semibold">Subtotal:</span> NPR{" "}
                    {subTotal().toFixed(2)}
                  </p>
                  <p>
                    <span className="font-semibold">VAT (13%):</span> NPR{" "}
                    {vatAmmount().toFixed(2)}
                  </p>
                  <p>
                    <span className="font-semibold">Shipping:</span> NPR{" "}
                    {shippingCharges.toFixed(2)}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Grand Total:</span>{" "}
                    <span className="font-bold">
                      NPR {grandTotal().toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Place order button */}
              <button
                onClick={handlePlaceOrder}
                className={`max-w-lg bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md mt-5 hover:bg-cyan-700 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PaymentMethod;
