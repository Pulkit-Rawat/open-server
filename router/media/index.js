const { Router } = require("express");
const mediaActions = require("./actions");
const upload = require("../../utilities/multer");

const mediaRouter = Router();

mediaRouter.post(
  "/upload-image",
  upload.single("img-file"),
  mediaActions.uploadImage
);

module.exports = mediaRouter;
