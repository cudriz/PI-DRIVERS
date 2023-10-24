const { Router } = require("express");

const teamRouter = Router();
const { getTeamsHandler } = require("../handlers/teamsHandler");

teamRouter.get("/", getTeamsHandler);

module.exports = teamRouter;
