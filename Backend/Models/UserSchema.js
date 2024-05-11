const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    "Name": {type: String,required: [true, "Please Enter Your Name"]},
    "userName": {type: String,required: [true, "Please Enter Your Username"]},
    "emailId": {type: String,required: [true, "Please Add Your e-mail address"]},
    "Favourites": [String]
})

const UserModel = mongoose.model("userschemas", userSchema)
const UserSocialModel = mongoose.model("usersocialschemas",userSchema)

module.exports = {UserModel,UserSocialModel}