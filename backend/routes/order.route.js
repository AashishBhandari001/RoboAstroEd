const express = require("express");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/auth.js");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  confirmOrder,
} = require("../controllers/order.controller.js");

const {
  handleKhaltiCallback,
  callKhalti,
} = require("../controllers/khalti.controller");

const router = express.Router();

router.route("/new").post(isAuthenticatedUser, newOrder);
router.route("/me").get(isAuthenticatedUser, myOrders);

router.route("/:id").get(isAuthenticatedUser, getSingleOrder);


router.route("/:id/initiate-payment").post(callKhalti);
router.route("/:id/verify-payment").post(handleKhaltiCallback);

router.route("/:id/confirm").put(confirmOrder); //confirm order for COD

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/orders/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
