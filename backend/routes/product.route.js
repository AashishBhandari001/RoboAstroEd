const express = require("express");

const router = express.Router();

const {
  product,
  getProducts,
} = require("../controllers/product.controller.js");

router.route("/", product).get(getProducts);

module.exports = router;
