const express = require("express");

const {
  google,
  signup,
  signin,
  passwordreset,
  forgetpassword,
  logout,
} = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/passwordreset", passwordreset);
router.post("/forgetpassword/:id/:token", forgetpassword);
router.get("/logout", logout)


module.exports = router;
