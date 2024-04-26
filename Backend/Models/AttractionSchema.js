const mongoose = require('mongoose')

const attractionsSchema = mongoose.Schema({
    Attraction_Name: {type: String,required: [true, "Please add the Name of Attraction"]},
    City: { type: mongoose.Schema.Types.ObjectId, ref: 'cityschemas'},
    State: { type: mongoose.Schema.Types.ObjectId, ref: 'stateschemas'},
    Image: {type: String,required: [true, "Please add image link of the State"]},
    Attraction_Description: {type: String,required: [true, "Please add the description about the state"]},
    Location: {type: String,required: [true,"Please add the Location"]},
    Attraction_Type: {type: String,required: [true,"Please add the type of attraction"]},
    Things_To_Know: {type: String,required: [true, "Please Add Things to know before you go"]},
    How_To_Get_There: {type: String,required: [true, "Please Add How to get there"]}
})

const AttractionModel  = mongoose.model("attractionschemas", attractionsSchema)

module.exports = AttractionModel