const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, "please Enter address"],
    },
    city: {
      type: String,
      required: [true, "please Enter city"],
    },
    state: {
      type: String,
      required: [true, "please Enter state"],
    },
    country: {
      type: String,
      default: "Nepal",
      required: [true, "please Enter country"],
    },
    pinCode: {
      type: Number,
      required: [true, "please Enter pinCode"],
    },

    phoneNo: {
      type: Number,
      required: [true, "please Enter phoneNumber"],
    },
  },

  orderItems: [
    {
      name: {
        type: String,
        required: [true, "please Enter product name"],
      },
      price: {
        type: Number,
        required: [true, "please Enter product price"],
      },
      image: {
        type: String,
        required: [true, "please Enter product image"],
      },
      quantity: {
        type: Number,
        required: [true, "please Enter product quantity"],
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  paymentType: {
    type: String,
    enum: ["khalti", "COD"],
    required: true,
  },

  // paymentInfo: {
  //   id: {
  //     type: String,
  //     required: true,
  //   },

  //   status: {
  //     type: String,
  //     required: true,
  //   },
  // },

  pidx: {
    type: String,
  },

  paymenturl: {
    type: String,
  },

  expiresAt: {
    type: Date,
  },

  paidAt: {
    type: Date,
    required: true,
  },

  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },

  taxPrice: {
    type: Number,
    required: true,

    default: 0.0,
  },

  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },

  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },

  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },

  deliveredAt: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
