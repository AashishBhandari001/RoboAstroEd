// Purpose: authentication middleware to check if user is logged in or not
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const User = require("../models/user.model.js");
const errorHandler = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  console.log(token);

  //   if (!token) {
  //     return next(errorHandler(401, "Login first to access this resource."));
  //   }

  //   const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  //   await User.findById(decodedData.id).then((user) => {
  //     req.user = user;
  //     next();
  //   });
});

module.exports = isAuthenticatedUser;
