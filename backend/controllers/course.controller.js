const Course = require("../models/course.model");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const errorHandler = require("../utils/error.js");

const getAllCourses = catchAsyncErrors(async (req, res, next) => {
  const courses = await Course.find().select("-lectures");
  res.status(200).json({
    success: true,
    courses,
  });
});

const createCourse = catchAsyncErrors(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy)
    return next(errorHandler("Please add all fields", 400));

  // const file = req.file;

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: "temp",
      url: "temp",
    },
  });
  res.status(200).json({
    success: true,
    message: "Course Created Successfully",
  });
});

const getCoursesLectures = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) return next(new errorHandler("Courses not found", 404));
  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

module.exports = { getAllCourses, createCourse, getCoursesLectures };
