const mongoose = require('mongoose')

const hotelSchema = mongoose.Schema({
    Hotel_Name: {type: String,required: [true, "Please add the Name of Hotel"]},
    City: { type: mongoose.Schema.Types.ObjectId, ref: 'cityschemas'},
    State: { type: mongoose.Schema.Types.ObjectId, ref: 'stateschemas'},
    Image: {type: String,required: [true, "Please add image link of the Hotel"]},
    Description: {type: String,required: [true, "Please add the description about the Hotel"]},
    Location: {type: String,required: [true,"Please add the Location"]},
    Price: {type: Number,required: [true,"Please add the Price"]},
})

const HotelModel  = mongoose.model("hotelschemas", hotelSchema)

module.exports = HotelModel