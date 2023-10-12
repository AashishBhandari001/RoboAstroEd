const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // username is required
      unique: true, // no two users can have the same username
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//create a model from schema
const User = mongoose.model("User", userSchema);

module.exports = User;
