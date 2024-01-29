const axios = require("axios");
const Order = require("../models/order.model");
const dotenv = require("dotenv");

dotenv.config();

const callKhalti = async (req, res) => {
  try {
    const khaltiData = ({
      return_url,
      website_url,
      amount,
      purchase_order_id,
      purchase_order_name,
      customer_info,
    } = req.body);

    const { id } = req.params;

    const headers = {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      khaltiData,
      { headers }
    );

    const { pidx, payment_url, expires_at } = response.data;

    const orders = await Order.findById(id);

    //update order with pidx, payment_url and expires_at  from khalti

    if (!orders) {
      return next(new errorHandler(404, "Order not found"));
    }

    orders.pidx = pidx;
    orders.paymentType = "Khalti";
    orders.paymenturl = payment_url;
    orders.expires_at = expires_at;

    await orders.save();

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error calling Khalti API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleKhaltiCallback = async (req, res, next) => {
  try {
    const { pidx } = req.body;
    const { id } = req.params;

    const headers = {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      { headers }
    );

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.paymentStatus = "Completed";
    await order.save();

    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err?.message || "Error Processing Khalti" });
  }
};

module.exports = { callKhalti, handleKhaltiCallback };
