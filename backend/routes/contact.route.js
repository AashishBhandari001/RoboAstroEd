const express = require("express");

const router = express.Router();

const { contactus } = require("../controllers/contact.controller.js");

router.post("/", contactus);

module.exports = router;
