const axios = require("axios");
const Order = require("../models/order.model");
const dotenv = require("dotenv");

dotenv.config();

const callKhalti = async (req, res) => {
  try {
    const payload = req.body;
    const headers = {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      { headers }
    );

    // Extract relevant data from Khalti response
    const { pidx, payment_url, expires_at } = response.data;

    // Create a new order with Khalti payment details
    const newOrder = new Order({
      pidx,
      paymenturl: payment_url,
      expiresAt: new Date(expires_at),
    });

    // Save the order to the database
    await newOrder.save();

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error calling Khalti API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleKhaltiCallback = async (req, res, next) => {
  try {
    const {} =
      req.query;

    const headers = {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      { headers }
    );

    console.log(response.data);
    if (response.data.status !== "Completed") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    console.log(purchase_order_id, pidx);
    req.transaction_uuid = purchase_order_id;
    req.transaction_code = pidx;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err?.message || "Error Processing Khalti" });
  }
};

module.exports = { callKhalti, handleKhaltiCallback };
