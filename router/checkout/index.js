const Router = require("express");
const { checkoutActions } = require("./actions");

const checkoutRouter = Router();

checkoutRouter.post(
  "/createPaymentSession",
  checkoutActions.createPaymentSession
);

module.exports = checkoutRouter
