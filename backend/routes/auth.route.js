const express = require("express");

const {
  google,
  signup,
  signin,
  passwordreset,
} = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/passwordreset", passwordreset);

module.exports = router;
