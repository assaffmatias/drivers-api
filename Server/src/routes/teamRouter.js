const {Router} = require("express");

const teamRouter = Router();

const {getTeamsHandler, createTeamHandler} = require('../handlers/teamHandler');

teamRouter.get("/", getTeamsHandler);

teamRouter.post("/", createTeamHandler)


module.exports = teamRouter;