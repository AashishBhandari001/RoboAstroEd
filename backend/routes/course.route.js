const {
  getAllCourses,
  createCourse,
} = require("../controllers/course.controller");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/auth.js");

const express = require("express");

const router = express.Router();

router.route("/courses").get(getAllCourses);

router
  .route("/createcourse")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCourse);

module.exports = router;
