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

const singleUpload = multer({ storage: storageSingle }).single("file");
const arrayUpload = multer({ storage }).array("images");

module.exports = { singleUpload, arrayUpload };
