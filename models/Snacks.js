const { Schema, model } = require("mongoose");

const snackSchema = new Schema({
  media: {
    type: Array,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
});

const Snacks = model("snacks", snackSchema);

module.exports = Snacks;
