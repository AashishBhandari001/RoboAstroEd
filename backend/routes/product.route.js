const express = require("express");

const router = express.Router();

const {
  product,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/product.controller.js");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/auth.js");

router.route("/", product).get(getProducts);
router
  .route("/new", product)
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
  .get(getProductDetails);

module.exports = router;
