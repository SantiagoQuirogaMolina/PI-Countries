activityRouter = require("express").Router();
const {getActivityHandler,createActivityHandler } = require("../handlres/activityHandler")


activityRouter.get("/", getActivityHandler);
activityRouter.post("/", createActivityHandler);


module.exports = activityRouter;
