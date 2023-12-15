import React from "react";
import CheckOutSteps from "../../Elements/CheckOutSteps";
import { useSelector } from "react-redux";
import MetaData from "../Metadata/metaData";
import { Link } from "react-router-dom";

function ConfirmOrder() {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);

  const subTotal = () => {
    let total = 0;

    cartItems.map((item) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
    });

    return total;
  };

  const vatAmmount = () => {
    const vat = 0.13;
    const total = subTotal();
    const vatAmmount = total * vat;
    return vatAmmount;
  };

  const shippingCharges = subTotal > 1000 ? 0 : 100;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state},${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const grandTotal = () => {
    const total = subTotal();
    const vat = vatAmmount();
    const grandTotal = total + vat + shippingCharges;
    return grandTotal;
  };
  return (
    <div className="mt-32">
      <MetaData title="confirm order" />
      <CheckOutSteps activeStep={1} />

      <div className="confirmOrder">
        <div>
          <h2>Shipping Info</h2>
          <div className="confirmshipping">
            <div>
              <p> Name: {currentUser && currentUser.username} </p>
              <p>Phone Number: {shippingInfo.phoneNo}</p>
              <p>Address: {address}</p>
            </div>
          </div>
        </div>

        <div className="confirmcart item">
          <h3>Your cart items: </h3>
          {cartItems &&
            cartItems.map((item) => (
              <div key={item.product}>
                <img src={item.image} alt="Products" />
                <Link to={`product/${item.product}`}>{item.name}</Link>
                <div>
                  {item.quantity} x {item.price} ={" "}
                  <b>NPR {item.price * item.quantity}</b>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="orderSummary">
        <h2>Order Summary: </h2>
        <div>
          <div>
            <p>Sub Total: {subTotal()}</p>
          </div>
          <div>
            <p>Tax(13%): {vatAmmount()}</p>
          </div>
          <div>
            <p>Shipping charges: {shippingCharges}</p>
          </div>
        </div>

        <div className="ordersummaryTotal">
          <p>
            <b>Total:</b>
          </p>
          <span>NPR {grandTotal()}</span>
        </div>

        <button>Proceed to payment</button>
      </div>
    </div>
  );
}

export default ConfirmOrder;
