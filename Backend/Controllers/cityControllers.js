const { mongo } = require("mongoose");
const CityModel = require("./../Models/CitySchema");
const StateModel = require("./../Models/StateSchema");

const getAllCities = async (req, res) => {
  try {
    const AllCities = await CityModel.find({}).populate("State");
    console.log("AllCities", AllCities);
    res.status(200).json(AllCities);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching All Cities" });
  }
};

const createAllCities = async (req, res) => {
  try {
    const {
      City_Name,
      State_Name,
      Latitude,
      Longitude,
      Image,
      City_Description,
      Iframe_Src,
      Popular_Attractions,
    } = req.body;

    const State = await StateModel.find({ State_Name }).exec();
    const StateId = State[0]._id;
    console.log("State", StateId);

    const postCity = await CityModel.create({
      City_Name,
      State : StateId,
      Latitude,
      Longitude,
      Image,
      City_Description,
      Iframe_Src,
      Popular_Attractions,
    });
    res.status(201).json({ message: "Create City", postCity });

  } catch (error) {
    console.log("error", error);
  }
};

module.exports = { getAllCities, createAllCities };
