const { getAllCourses } = require("../controllers/course.controller");

const express = require("express");

const router = express.Router();

router.route("/courses").get(getAllCourses);

module.exports = router;
