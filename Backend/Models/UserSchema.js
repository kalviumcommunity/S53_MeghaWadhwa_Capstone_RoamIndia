const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    "Name": {type: String,required: [true, "Please Enter Your Name"]},
    "userName": {type: String,required: [true, "Please Enter Your Username"],unique: true},
    "emailId": {type: String,required: [true, "Please Add Your e-mail address"],unique: true},
    "Favourites": [String]
})

const UserModel = mongoose.model("userschemas", userSchema)
const UserSocialModel = mongoose.model("usersocialschemas",userSchema)

module.exports = {UserModel,UserSocialModel}