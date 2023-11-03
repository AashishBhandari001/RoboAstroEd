const express = require("express");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/auth.js");
const { newOrder } = require("../controllers/order.controller.js");

const router = express.Router();

router.route("/new").post(isAuthenticatedUser, newOrder);

module.exports = router;
