const Department = require("../../models/Departments");
const UserDepartments = require("../../models/UserDepartments");
const User = require("../../models/Users");

const dptActions = {
  create: async (req, res) => {
    try {
      const { dptName } = req.body;
      let dpt = await Department.findOne({ dptName });

      //check if department is already created
      if (dpt) {
        return res.status(401).json({
          message: "Department already created",
          success: false,
        });
      }

      //create department
      dpt = await Department.create({ ...req.body, isActive: true });

      if (dpt) {
        return res.status(200).json({
          message: "Department created successfully.",
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
  getDepartments: async (req, res) => {
    try {
      let departments = await Department.find({ isActive: "true" });

      if (departments) {
        return res.status(200).json({
          message: "Departments found.",
          data: departments,
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
  deleteDepartment: async (req, res) => {
    try {
      let { dptId } = req.body;
      let department = await Department.updateOne(
        { _id: dptId },
        { $set: { ["isActive"]: false } },
        { new: true }
      );

      if (department) {
        return res.status(200).json({
          message: "Departments deleted.",
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
  getDepartmentByID: async (req, res) => {
    let { id } = req.body;
    try {
      let dpt = await Department.findOne({ _id: id });

      //find assigned employee details
      let records = await UserDepartments.find({ dptId: id });
      records = records.map((item) => item.userId);
      let empList = await User.find({ _id: { $in: records } });
      if (dpt) {
        return res.status(200).json({
          message: "Department details found.",
          data: dpt,
          empList: empList,
          success: true,
        });
      }
      return res.status(401).json({
        message: "No record found.",
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

module.exports = dptActions;
