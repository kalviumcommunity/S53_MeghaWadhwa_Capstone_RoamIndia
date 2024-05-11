const express = require("express");
const router = express.Router();
const { getAllUsers, getOneUser, updateUser, deleteOneUser, checkUser, AddNewUserToNonSocial, AddNewUserToSocial, getAllSocialUsers, getAllNonSocialUsers } = require("../Controllers/userControllers");

router.get('/',getAllUsers)

router.get('/social',getAllSocialUsers)

router.get('/nonsocial',getAllNonSocialUsers)

router.get('/:id',getOneUser)

router.post('/checkbyemail',checkUser)

router.post('/',AddNewUserToNonSocial)

router.post('/tosocial',AddNewUserToSocial)

router.patch('/:id',updateUser)

router.delete('/:id',deleteOneUser)

module.exports = router;
