const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    "Name": {type: String,required: [true, "Please Enter Your Name"]},
    "userName": {type: String,required: [true, "Please Enter Your Username"]},
    "emailId": {type: String,required: [true, "Please Add Your e-mail address"]},
    "Password": {type: String,required: [true, "Please Enter Your Password"]},
    "Favourites": [String]
})

const UserModel = mongoose.model("userschemas", userSchema)

module.exports = UserModel