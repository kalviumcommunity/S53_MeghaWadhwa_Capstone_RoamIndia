const mongoose = require('mongoose')

const attractionsSchema = mongoose.Schema({
    Attraction_Name: {type: String,required: [true, "Please add the Name of Attraction"]},
    State: { type: mongoose.Schema.Types.ObjectId, ref: 'stateschemas'},
    City: { type: mongoose.Schema.Types.ObjectId, ref: 'cityschemas'},
    Image: {type: String},
    Attraction_Description: {type: String,required: [true, "Please add the description about the Attraction"]},
    Location: {type: String,required: [true,"Please add the Location"]},
    Attraction_Type: {type: String,required: [true,"Please add the type of attraction"]},
    // Photos: [{type: String}],
    Things_To_Know: [{type: String}],
    How_To_Get_There: {type: String},
})

const AttractionModel  = mongoose.model("attractionschemas", attractionsSchema)

module.exports = AttractionModel