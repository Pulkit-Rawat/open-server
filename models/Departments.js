const { Schema, model } = require("mongoose");

const departmentSchema = new Schema({
  dptName: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  isActive: {
    type: String,
  },
});

const Departments = model("departments", departmentSchema);

module.exports = Departments;
