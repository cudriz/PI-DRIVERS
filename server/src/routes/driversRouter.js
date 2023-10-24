const { Router } = require("express");

const driverRouter = Router();
const {getDriverHandler, getDriverById, createDriver, getDriverByNameHandler} = require ('../handlers/driversHandler')


driverRouter.get("/", getDriverHandler)

driverRouter.get("/search/name", getDriverByNameHandler)

driverRouter.get("/:id", getDriverById )


driverRouter.post("/",  createDriver)
module.exports = driverRouter;