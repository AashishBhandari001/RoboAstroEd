const express = require("express");

const router = express.Router();
const { singleUpload } = require("../middleware/multer.js");

const {
  product,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  // createProductReview,
  // getProductReview,
  // deleteReview,
  getAdminProducts,
} = require("../controllers/product.controller.js");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/auth.js");

router.route("/", product).get(getProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/product/new", product)
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    singleUpload,
    createProduct
  );

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// router.route("/review").put(isAuthenticatedUser, createProductReview);
// router
//   .route("/review")
//   .get(isAuthenticatedUser, getProductReview)
//   .delete(isAuthenticatedUser, deleteReview);

router.route("/:id").get(getProductDetails);

module.exports = router;
