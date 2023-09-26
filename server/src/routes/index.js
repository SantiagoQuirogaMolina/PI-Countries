const {Router}= require("express");
const activityRouter = require("./activityRoute");
const countriesRouter = require("./countriesRoute");


const indexRouter = Router();


indexRouter.use("/countries", countriesRouter);
indexRouter.use("/activities",activityRouter);

module.exports = indexRouter;
