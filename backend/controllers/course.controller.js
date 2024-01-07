const Course = require("../models/course.model");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const errorHandler = require("../utils/error.js");
const getDataUri = require("../utils/dataUri.js");
const cloudinary = require("../utils/cloudinary.js");

const getAllCourses = catchAsyncErrors(async (req, res, next) => {
  const courses = await Course.find().select("-lectures");
  res.status(200).json({
    success: true,
    courses,
  });
});

const createCourse = catchAsyncErrors(async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy)
      return next(errorHandler("Please add all fields", 400));

    const file = req.file;
    const fileUri = getDataUri(file);

    const mycloud = await cloudinary.uploader.upload(fileUri.content);

    await Course.create({
      title,
      views: 0,
      description,
      category,
      createdBy,
      poster: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, error));
  }
});

const getCoursesLectures = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  console.log(course);

  if (!course) {
    next(errorHandler("Courses not found", 404));
  }
  course.views += 1;

  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

//max mb size 100mb
const addLecture = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // const file = req.file;
  const course = await Course.findById(id);

  if (!course) {
    next(errorHandler("Courses not found", 404));
  }

  const file = req.file;
  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.uploader.upload(fileUri.content, {
    resource_type: "video",
  });

  //upload file here
  course.lectures.push({
    title,
    description,
    video: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture added succcessfully in course",
  });
});

//delete course
const deleteCourse = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (!course) {
    next(errorHandler("Courses not found", 404));
  }

  await cloudinary.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];

    await cloudinary.uploader.destroy(singleLecture.video.public_id, {
      resource_type: "video",
    });
  }

  await course.deleteOne();

  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
});

//delete course
const deleteLecture = catchAsyncErrors(async (req, res, next) => {
  const { courseId, lectureId } = req.params;

  const course = await Course.findById(courseId);

  if (!course) {
    next(errorHandler("Courses not found", 404));
  }

  const lecture = course.lectures.find(
    (item) => item._id.toString() === lectureId.toString()
  );

  await cloudinary.uploader.destroy(lecture.video.public_id, {
    resource_type: "video",
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  course.lectures = course.lectures.filter((item) => {
    if (item._id.toString() !== lectureId.toString()) {
      return item;
    }
  });

  res.status(200).json({
    success: true,
    message: "Lecture deleted successfully",
  });
});

module.exports = {
  getAllCourses,
  createCourse,
  deleteCourse,
  getCoursesLectures,
  addLecture,
  deleteLecture,
};
