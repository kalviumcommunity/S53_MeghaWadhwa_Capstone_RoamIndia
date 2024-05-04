const express = require("express");
const router = express.Router();

const {getAllStates} = require('./../Controllers/stateControllers')

// router.post('/insert',insertId)
router.get('/',getAllStates)

module.exports = router;
