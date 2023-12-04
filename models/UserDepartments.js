const { Schema, model } = require("mongoose");

const userDeptSchema = new Schema({
  dptId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Departments = model("usersdepartmentmap", userDeptSchema);

module.exports = Departments;
