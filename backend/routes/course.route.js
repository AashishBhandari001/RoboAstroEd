const {
  getAllCourses,
  createCourse,
  getCoursesLectures,
  addLecture,
} = require("../controllers/course.controller");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/auth.js");

const express = require("express");
const { singleUpload } = require("../middleware/multer.js");

const router = express.Router();

router.route("/courses").get(getAllCourses);

router
  .route("/createcourse")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    singleUpload,
    createCourse
  );

//add lecture , delete cou rse,
router
  .route("/course/:id")
  .get(getCoursesLectures)
  .post(singleUpload, addLecture);

module.exports = router;
