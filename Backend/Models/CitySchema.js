const mongoose = require('mongoose')

const citySchema = mongoose.Schema({
    City_Name: {type: String,required: [true, "Please add the Name of city"]},
    State: { type: mongoose.Schema.Types.ObjectId, ref: 'stateschemas'},
    Latitude: {type: Number},
    Longitude: {type: Number},
    Image: {type: String},
    City_Description: {type: String,required: [true, "Please add the description about the city"]},
    Iframe_Src: {type: String},
    Popular_Attractions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'attractionschemas' }],
})

const CityModel  = mongoose.model("cityschemas", citySchema)
module.exports = CityModel