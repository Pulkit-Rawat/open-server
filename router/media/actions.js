const mediaActions = {
  uploadImage: (req, res) => {
    try {
      if (!req.file) {
        return res.status(200).json({
          message: "Failed to upload.",
          status: false,
        });
      }
      return res.status(200).json({
        message: "File uploaded successfully.",
        status: true,
      });
    } catch (err) {
      console.log(err);
      return res.status(200).json({
        message: "Failed to upload.",
        status: false,
      });
    }
  },
};

module.exports = mediaActions;
