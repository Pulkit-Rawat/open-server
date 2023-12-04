const User = require("../../models/Users");
const UserDepartment = require("../../models/UserDepartments");
const empActions = {
  getAllEmployee: async (req, res) => {
    try {
      let users = await User.find({ role: 2 });
      if (users) {
        return res.status(200).json({
          message: "Employees list found.",
          data: users,
          success: true,
        });
      }

      //default case error
      return res.status(401).json({
        message: "Something went wrong.",
        success: false,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Something went wrong...",
      });
    }
  },
  assignDepartmentToEmployee: async (req, res) => {
    try {
      let { dptId, userId } = req.body;
      let resData = await UserDepartment.create({
        dptId: dptId,
        userId: userId,
      });
      if (resData) {
        return res.status(200).json({
          message: "Department assigned.",
          success: true,
        });
      }
      return res.status(401).json({
        message: "Something went wrong.",
        success: false,
      });
    } catch (err) {
      console.log("err", err);
      return res.status(401).json({
        message: "Something went wrong.",
        success: false,
      });
    }
  },
  getEmployeeByID: async (req, res) => {
    let { id } = req.body;
    try {
      let user = await User.findOne({ _id: id });
      if (user) {
        return res.status(200).json({
          message: "Employees list found.",
          data: user,
          success: true,
        });
      }
      return res.status(401).json({
        message: "Something went wrong.",
        success: false,
      });
    } catch (err) {
      return res.status(401).json({
        message: "Something went wrong.",
        success: false,
      });
    }
  },
};

module.exports = empActions;
