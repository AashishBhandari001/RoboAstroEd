const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please Enter product description"],
  },
  price: {
    type: Number,
    required: [true, "please Enter product price"],
    maxLength: [8, "price cannot exceed 8 characters"],
  },
  // ratings: {
  //   type: Number,
  //   default: 0,
  // },

  // for using multer
  // images: [
  //   {
  //     url: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],

  //for cloudinary
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "please Enter product category"],
  },

  stock: {
    type: Number,
    required: [true, "please Enter product stock"],
    maxLength: [4, "stock cannot exceed 4 characters"],
    default: 1,
  },

  // numOfReviews: {
  //   type: Number,
  //   default: 0,
  // },

  // reviews: [
  //   {
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //       required: true,
  //     },

  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     rating: {
  //       type: Number,
  //       required: true,
  //     },
  //     comment: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
