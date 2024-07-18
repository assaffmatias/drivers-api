const {Router} = require('express')
const driverRouter = require('./driverRouter');
const teamRouter = require('./teamRouter');

const mainRouter = Router();

mainRouter.use("/drivers", driverRouter);

mainRouter.use("/teams", teamRouter)

module.exports = mainRouter;

