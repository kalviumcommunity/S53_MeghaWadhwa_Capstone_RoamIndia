const express = require("express");
const router = express.Router();
const { getAllUsers, getOneUser, AddNewUser, updateUser, deleteOneUser } = require("../Controllers/userControllers");

router.get('/',getAllUsers)

router.get('/:id',getOneUser)

router.post('/',AddNewUser)

router.patch('/:id',updateUser)

router.delete('/:id',deleteOneUser)

module.exports = router;
