const express = require("express");
const router = express.Router();

const {getAllCities, createAllCities} = require('./../Controllers/cityControllers')

router.get('/',getAllCities)
router.post('/',createAllCities)


module.exports = router;
