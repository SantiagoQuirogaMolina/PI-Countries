countriesRouter = require("express").Router();
const {getCountrieHandler, getIdHandler, getCountriesByName, createActiviryHandler,} = require("../handlres/countriesHandler")

countriesRouter.get("/", getCountrieHandler);
countriesRouter.get("/:id", getIdHandler);
countriesRouter.get("/name/:name",getCountriesByName);
//countriesRouter.post("/",createActiviryHandler);

module.exports = countriesRouter;
