const express = require("express");
const router = express.Router();
const { getAllAttractions,createAllAttractions } = require("../Controllers/attractionControllers");

router.get("/",getAllAttractions)

router.post("/",createAllAttractions)

module.exports = router;
