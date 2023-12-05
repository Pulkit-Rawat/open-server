const { Router } = require("express");
const chatActions = require("./actions");
const chatRouter = Router();

chatRouter.post("/getChats", chatActions.getChats);
// departmentRouter.get("/getAllDepartments", departmentActions.getDepartments);
// departmentRouter.post("/deleteDepartment", departmentActions.deleteDepartment);
// departmentRouter.post(
//   "/getDepartmentByID",
//   departmentActions.getDepartmentByID
// );

module.exports = chatRouter;
