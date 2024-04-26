const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({
    Restaurant_Name: {type: String,required: [true, "Please add the Name of Hotel"]},
    City: { type: mongoose.Schema.Types.ObjectId, ref: 'cityschemas'},
    State: { type: mongoose.Schema.Types.ObjectId, ref: 'stateschemas'},
    Image: {type: String,required: [true, "Please add image link of the Restaurant"]},
    Description: {type: String,required: [true, "Please add the description about the Restaurant"]},
    Location: {type: String,required: [true,"Please add the Location"]},
})

const RestaurantModel  = mongoose.model("restaurantschemas", restaurantSchema)

module.exports = RestaurantModel