const express = require("express");
const Product = require("../models/product.model");
const errorHandler = require("../utils/error.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

const dotenv = require("dotenv");
const ApiFeatures = require("../utils/apifeatures");
dotenv.config();

//create new product --Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id; //user id from auth middleware

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//get all products
const getProducts = catchAsyncErrors(async (req, res) => {
  const productCount = await Product.countDocuments();
  const resultPerPage = 4;
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
});

//get single product
const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(errorHandler(404, "Product not found"));
  }
  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});

//update product --Admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(errorHandler(404, "Product not found"));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete product --Admin

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }
    res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  } catch (error) {
    // Handle errors, e.g., server error
    return res.status(500).json({
      success: false,
      message: "Error deleting the product",
      error: error.message,
    });
  }
};

//create new review or update the review
const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  console.log(product);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.comment = comment;
        rev.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
  }

  product.numOfReviews = product.reviews.length;

  // Calculate average rating
  let totalRatings = 0; // Total ratings

  product.reviews.forEach((rev) => {
    totalRatings += rev.rating;
  });

  product.ratings = totalRatings; // Set total ratings

  const averageRating = totalRatings / product.reviews.length;
  product.averageRating = averageRating; // Set average rating in the product

  await product.save({ validateBeforeSave: false }); // Save the updated product with reviews
  res.status(200).json({
    success: true,
  });
  // Send a response or perform other necessary actions
});

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
};
