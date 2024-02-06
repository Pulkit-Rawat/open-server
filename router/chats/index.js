const { Router } = require("express");
const chatActions = require("./actions");
const chatRouter = Router();

chatRouter.post("/getChats", chatActions.getChats);

module.exports = chatRouter;
