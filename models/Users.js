const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mob: {
    type: String,
    required: true,
  },
});

const User = model("users", userSchema);

module.exports = User;
