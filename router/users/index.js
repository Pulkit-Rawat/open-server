const { Router } = require("express");
const userActions = require("./actions");
const userRouter = Router();

userRouter.post("/register", userActions.register);
userRouter.post("/login", userActions.login);

module.exports = userRouter;
