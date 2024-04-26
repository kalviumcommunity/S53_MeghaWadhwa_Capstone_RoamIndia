const mongoose = require('mongoose')

const citySchema = mongoose.Schema({
    City_Name: {type: String,required: [true, "Please add the Name of city"]},
    State: { type: mongoose.Schema.Types.ObjectId, ref: 'stateschemas'},
    Latitude: {type: Number},
    Longitude: {type: Number},
    Image: {type: String,required: [true, "Please add image link of the city"]},
    Description: {type: String,required: [true, "Please add the description about the city"]},
    Iframe_Src: {type: String},
    Attractions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'attractionschemas' }],
})

const CityModel  = mongoose.model("cityschemas", citySchema)
module.exports = CityModel