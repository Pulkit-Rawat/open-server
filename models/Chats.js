const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
    messages: {
    type: Object,
  },
});

const Chat = model("chats", chatSchema);

module.exports = Chat;
