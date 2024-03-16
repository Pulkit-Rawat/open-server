const {Router} = require('express');
const { profileActions } = require('./actions');

const profileRouter = Router();

profileRouter.post('/updateProfile', profileActions.updateProfile)

module.exports = profileRouter;