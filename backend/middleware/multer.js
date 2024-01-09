const multer = require("multer");

//for single file
const storageSingle = multer.memoryStorage();

//save in server itself for multipel files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

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
const arrayUpload = multer({ storage }).array("images");
// const videoUpload = multer({ storage: videoStorage }).single("video");

module.exports = { singleUpload, arrayUpload };
