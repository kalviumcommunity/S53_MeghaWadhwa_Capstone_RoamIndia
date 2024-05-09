const express = require("express");
const router = express.Router();

const {getAllStates, createState} = require('./../Controllers/stateControllers')

router.get('/',getAllStates)

router.post('/',createState)

module.exports = router;
