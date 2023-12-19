const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter course title"],
    minLength: [4, "Title must be at least four character"],
    maxLength: [80, "Title cannot exceed 80 character"],
  },

  description: {
    type: String,
    required: [true, "Please enter course title"],
    minLength: [20, "Description must be at least four character"],
  },

  lectures: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      video: {
        public_id: {
          type: String,
          required: true,
        },

        url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  poster: {
    public_id: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },
  },

  views: {
    type: Number,
    default: 0,
  },

  numOfVideos: {
    type: Number,
    default: 0,
  },

  category: {
    type: String,
    required: true,
  },

  createdBy: {
    type: Date,
    required: [true, "Enter course Creator Name"],
  },

  createdBy: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.module("Course");
