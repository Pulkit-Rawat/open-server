const Snacks = require("../../models/Snacks");

module.exports.snackActions = {
  addSnack: async (req, res) => {
    try {
      let payload = req.body;
      const data = await Snacks.create(payload);
      if (data) {
        return res.status(200).json({
          message: "Snack served successfully",
          success: true,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(200).json({
        message: "unable to save data",
        success: false,
      });
    }
  },
  getSnacks: async (req, res) => {
    try {
      let { tag } = req.body;
      // const data = await Snacks.find({tags: { $regex: `/${tag}/i` }});
      const data = await Snacks.find({tags: { $regex: tag, $options: 'i' }});

      if (data) {
        return res.status(200).json({
          data,
          message: "Snacks found.",
          success: true,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(200).json({
        message: "unable to fetch snacks",
        success: false,
      });
    }
  },
};
