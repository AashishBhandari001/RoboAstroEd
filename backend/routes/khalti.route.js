const express = require("express");

const {
  handleKhaltiCallback,
  callKhalti,
} = require("../controllers/khalti.controller");

const router = express.Router();

router.route("/initiate").post(callKhalti);

router.route("/callback").get(handleKhaltiCallback);

module.exports = router;
