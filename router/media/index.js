const { Router } = require("express");
const mediaActions = require("./actions");

const multer = require("multer");

const mediaRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Files will be saved in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Add a timestamp to the file name
  },
});

const upload = multer({ storage: storage });



mediaRouter.post("/upload-media", upload.single("profile"), (req, res) => {
  return res.send("Single file");
});

module.exports = mediaRouter;
