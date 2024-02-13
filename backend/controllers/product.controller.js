const express = require("express");
const Product = require("../models/product.model");
const errorHandler = require("../utils/error.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

const dotenv = require("dotenv");
const ApiFeatures = require("../utils/apifeatures");
dotenv.config();

//create new product --Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
  // images.push(req.body.images);

  // if (typeof req.body.images === "string") {
  // } else {
  //   images = req.body.images;
  // }

  // for (let i = 0; i < images.length; i++) {
  //   const result = await cloudinary.uploader.upload(images[i], {
  //     folder: "products",
  //   });

  //   imagesLinks.push({
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   });

  // }

  req.body.user = req.user.id; //user id from auth middleware
  req.body.images = req.files.map((file) => {
    return { url: process.env.IMAGE_URL + file.filename };
  });

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//get all products
const getProducts = catchAsyncErrors(async (req, res) => {
  const productCount = await Product.countDocuments();
  const resultPerPage = 7;
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
  });
});

//get all products admin
const getAdminProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find();

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
  });
});

//update product --Admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating the product",
      error: error.message,
    });
  }
});

//delete product --Admin

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }

    // Delete images associated with the product from cloudinary
    // for (let i = 0; i < product.images.length; i++) {
    //   await cloudinary.uploader.destroy(product.images[i].public_id);
    // }

    res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting the product",
      error: error.message,
    });
  }
};

//create new review or update the review
// const createProductReview = catchAsyncErrors(async (req, res, next) => {
//   const { rating, comment, productId } = req.body;

//   const review = {
//     user: req.user.id,
//     name: req.user.name,
//     rating: Number(rating),
//     comment,
//   };

//   const product = await Product.findById(productId);
//   console.log(product);
//   if (!product) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Product not found" });
//   }

//   const isReviewed = product.reviews.find(
//     (rev) => rev.user.toString() === req.user.id.toString()
//   );

//   if (isReviewed) {
//     product.reviews.forEach((rev) => {
//       if (rev.user.toString() === req.user.id.toString()) {
//         rev.comment = comment;
//         rev.rating = rating;
//       }
//     });
//   } else {
//     product.reviews.push(review);
//   }

//   product.numOfReviews = product.reviews.length;

//   // Calculate average rating
//   let totalRatings = 0; // Total ratings

//   product.reviews.forEach((rev) => {
//     totalRatings += rev.rating;
//   });

//   product.ratings = totalRatings; // Set total ratings

//   const averageRating = totalRatings / product.reviews.length;
//   product.averageRating = averageRating; // Set average rating in the product

//   await product.save({ validateBeforeSave: false }); // Save the updated product with reviews
//   res.status(200).json({
//     success: true,
//   });
//   // Send a response or perform other necessary actions
// });

// //get single product review
// const getProductReview = catchAsyncErrors(async (req, res, next) => {
//   const product = await Product.findById(req.query.id);

//   if (!product) {
//     return next(errorHandler(404, "Product not found"));
//   }

//   res.status(200).json({
//     success: true,
//     reviews: product.reviews,
//   });
// });

// // delete product review

// const deleteReview = catchAsyncErrors(async (req, res, next) => {
//   const product = await Product.findById(req.query.productId);

//   if (!product) {
//     return next(new errorHandler(404, "Product not found"));
//   }

//   const reviews = product.reviews.filter(
//     (rev) => rev._id.toString() !== req.query.id.toString()
//   );

//   let avg = 0;

//   reviews.forEach((rev) => {
//     avg += rev.rating;
//   });

//   const ratings = avg / reviews.length;

//   const numOfReviews = reviews.length;

//   await Product.findByIdAndUpdate(
//     req.query.productId,
//     {
//       reviews,
//       ratings,
//       numOfReviews,
//     },
//     {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     }
//   );

//   res.status(200).json({
//     success: true,
//     reviews,
//   });
// });

module.exports = {
  getAdminProducts,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  // createProductReview,
  // getProductReview,
  // deleteReview,
};
