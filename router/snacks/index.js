const {Router} = require('express');
const { snackActions } = require('./actions');

const snackRouter = Router();

snackRouter.post('/create-snack', snackActions.addSnack)
snackRouter.post('/get-snacks', snackActions.getSnacks)

module.exports = snackRouter;