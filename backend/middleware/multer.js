const multer = require("multer");
const mongoose = require("mongoose");

//for single file
const storageSingle = multer.memoryStorage();

//for storage to use in cloudinary
const storageArray = multer.memoryStorage();

const storage = multer.diskStorage({
  destination: "/tmp/uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now().toString()}_${new mongoose.Types.ObjectId()}.${
        file.mimetype.split("/")[1]
      }`
    );
  },
});

//for multer
//save in server itself for multipel files
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, __dirname + "/../uploads");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });

// //save in server itself for video files
// const videoStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, __dirname + "/../uploads/videos");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });

const singleUpload = multer({ storage: storageSingle }).single("file");
const arrayUpload = multer({ storage: storageArray }).array("images", 10);

const upload = multer({ storage: storage });

// const videoUpload = multer({ storage: videoStorage }).single("video");

module.exports = { singleUpload, arrayUpload, upload };
