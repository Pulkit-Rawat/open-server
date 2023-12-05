const Chat = require("../../models/Chats");

const dptActions = {
  getChats: async (req, res) => {
    let { uID } = req.body;
    try {
      let chatData = await Chat.findOne({ _id: uID });

      if (chatData) {
        return res.status(200).json({
          message: "Chats found.",
          data: chatData,
          success: true,
        });
      }
      return res.status(200).json({
        message: "No record found.",
        success: false,
      });
    } catch (err) {
      return res.status(200).json({
        message: "Something went wrong.",
        success: false,
      });
    }
  },
};

module.exports = dptActions;
