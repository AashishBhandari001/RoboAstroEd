const Order = require("../models/order.model");
const errorHandler = require("../utils/error.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Product = require("../models/product.model");

const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//get singlie order
const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); //will get user name and email from user model using user id

  console.log(order);

  if (!order) {
    return next(new errorHandler(404, "Order not found"));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in user orders
const myOrders = catchAsyncErrors(async (req, res, next) => {
  //   console.log("myfff");
  //   console.log(req.user.id);
  const orders = await Order.find({ user: req.user.id });

  return res.status(200).json({
    success: true,
    orders,
  });
});

module.exports = { newOrder, getSingleOrder, myOrders };
