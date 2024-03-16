const Profile = require("../../models/Profile");

module.exports.profileActions = {
  updateProfile: async (req, res) => {
    try {
      console.log(
        "req body===============================================================>: ",
        req.body
      );
    } catch (err) {
      console.log(err);
    }
  },
};
