const {
  getAllCourses,
  createCourse,
  getCoursesLectures,
  addLecture,
  deleteCourse,
  deleteLecture,
} = require("../controllers/course.controller");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/auth.js");

const express = require("express");
const { singleUpload } = require("../middleware/multer.js");

const router = express.Router();

router.route("/course").get(getAllCourses);

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
  .post(isAuthenticatedUser, authorizeRoles("admin"), singleUpload, addLecture)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCourse);

//delete lecture

router
  .route("/course/:courseId/lecture/:lectureId")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteLecture);

module.exports = router;
