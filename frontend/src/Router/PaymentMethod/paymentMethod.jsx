import React, { useState } from "react";
import CheckOutSteps from "../../Elements/CheckOutSteps";
import MetaData from "../Metadata/metaData";
import cash_In_Delevery from "../.././Assets/cashdelevery.png";
import Khalti from "../.././Assets/khalti.png";
import { useNavigate } from "react-router-dom";

function PaymentMethod() {
  const navigate = useNavigate();
  const subtotal = 100;
  const vatRate = 0.1;
  const vatAmount = subtotal * vatRate;
  const grandTotal = subtotal + vatAmount;

  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handlePlaceOrder = () => {
    if (selectedPayment === "Khalti") {
      navigate("/home");
    } else if (selectedPayment === "CashOnDelivery") {
      navigate("/products");
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

            {/* Total amount section */}
            <div className="flex flex-col sm:col-span-3 mt-8 bg-white p-6 rounded-md shadow-md max-w-lg justify-center">
              <h2 className="text-xl font-semibold mb-4">Total Amount</h2>
              <div className="flex flex-col space-y-2">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>
                  VAT ({(vatRate * 100).toFixed(0)}%): ${vatAmount.toFixed(2)}
                </p>
                <p className="font-semibold text-lg">
                  Grand Total: ${grandTotal.toFixed(2)}
                </p>
              </div>

              {/* Place order button */}
              <button
                onClick={handlePlaceOrder}
                className="max-w-lg bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md mt-5 hover:bg-cyan-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PaymentMethod;
