const { Router } = require("express");
const empActions = require("./actions");
const empRouter = Router();

empRouter.get("/getAllEmployee", empActions.getAllEmployee);
empRouter.post("/assignDeptToEmployee", empActions.assignDepartmentToEmployee);
empRouter.post("/getEmployeeByID", empActions.getEmployeeByID);

module.exports = empRouter;
