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
    paymentType,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paymentType,
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
    "username email"
  ); //will get user name and email from user model using user id

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
  const orders = await Order.find({ user: req.user.id });

  return res.status(200).json({
    success: true,
    orders,
  });
});

//get all orders --Admin
const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  }); //calculate total amount of all orders

  return res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//update orders status --Admin
const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.findById(req.params.id);

  if (!orders) {
    return next(new errorHandler(404, "Order not found"));
  }

  if (orders.orderStatus === "Delivered") {
    return next(errorHandler(400, "Order already delivered"));
  }

  orders.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity);
  }); //update stock

  orders.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    orders.deliveredAt = Date.now();
  }

  await orders.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;  

  await product.save({ validateBeforeSave: false });
}

//delete order --Admin
const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.findByIdAndRemove(req.params.id);

  if (!orders) {
    return next(new errorHandler(404, "Order not found"));
  }

  return res.status(200).json({
    success: true,
  });
});

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
