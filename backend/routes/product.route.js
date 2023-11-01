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
// const isAuthenticatedUser = require("../middleware/auth.js");

router.route("/", product).get(getProducts);
router.route("/new", product).post(createProduct);

router
  .route("/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetails);

module.exports = router;
