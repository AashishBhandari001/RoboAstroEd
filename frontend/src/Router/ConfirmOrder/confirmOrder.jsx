import React from "react";
import CheckOutSteps from "../../Elements/CheckOutSteps";
import { useSelector } from "react-redux";
import MetaData from "../Metadata/metaData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ConfirmOrder() {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);

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

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const grandTotal = () => {
    const total = subTotal();
    const vat = vatAmmount();
    const grandTotal = total + vat + shippingCharges;
    return grandTotal;
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="py-14 mt-16 md:mt-20 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <CheckOutSteps activeStep={1} />
      <div className="flex mt-4 justify-start item-start space-y-2 flex-col ">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
          Order
        </h1>
        <p className="text-base font-medium leading-6 text-gray-600">
          {currentTime.toLocaleString()}
        </p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
              Customer’s Cart
            </p>
            <div className="mt-4 flex flex-col w-full ">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <div className="w-full flex flex-col md:flex-row md:space-x-4 space-y-4">
                      <div className="pb-4 w-full md:w-40">
                        <img
                          className="w-full"
                          src={item.image}
                          alt="products"
                        />
                      </div>
                      <div className="flex flex-row pb-6  justify-between item-center w-full">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                          {item.name}
                        </h3>
                        <div>
                          {item.quantity} x {item.price} ={" "}
                          <b>NPR {item.price * item.quantity}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-base leading-4 text-gray-800">Subtotal</p>
                  <p className="text-base leading-4 text-gray-600">
                    {subTotal()}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">
                    VAT Amount(13%)
                  </p>
                  <p className="text-base leading-4 text-gray-600">
                    {vatAmmount()}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">Shipping</p>
                  <p className="text-base leading-4 text-gray-600">
                    {shippingCharges}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Total
                </p>
                <p className="text-base font-semibold leading-4 text-gray-600">
                  {` NPR ${grandTotal()}`}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div className="flex flex-col justify-start items-center">
                    <p className="text-lg leading-6 font-semibold text-gray-800">
                      Ready to complete your order and proceed to payment?
                      <br />
                      <span className="font-normal">
                        Securely checkout and enjoy your new items!
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center items-center">
                <Link to="/products" className="w-full">
                  <button className="mt-6 md:mt-0 py-5 bg-cyan-700 hover:bg-cyan-800 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 w-full 2xl:w-full leading-4 font-medium">
                    Proceed to Payment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-xl font-semibold leading-5 text-gray-800">
            Customer
          </h3>
          <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <div className=" flex justify-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4 text-left text-gray-800">
                    Name: {currentUser.username}
                  </p>
                  <p className="text-base font-semibold leading-4 text-left text-gray-800">
                    Phone Number: {shippingInfo.phoneNo}
                  </p>
                </div>
              </div>

              <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 7L12 13L21 7"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="cursor-pointer text-sm leading-5 text-gray-800">
                  {currentUser.email}
                </p>
              </div>
            </div>
            <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                    Shipping Address
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {address}
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                <Link to="/shipping" className="w-full">
                  <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">
                    Edit Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
