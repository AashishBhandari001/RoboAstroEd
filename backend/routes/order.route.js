const express = require("express");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/auth.js");
const {
  newOrder,
  getSingleOrder,
  myOrders,
} = require("../controllers/order.controller.js");

const router = express.Router();

router.route("/new").post(isAuthenticatedUser, newOrder);
router.route("/me").get(isAuthenticatedUser, myOrders);

router
  .route("/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder);

module.exports = router;
