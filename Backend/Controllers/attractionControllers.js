const { mongo } = require("mongoose");
const AttractionModel = require("./../Models/AttractionSchema");
const StateModel = require("./../Models/StateSchema");
const CityModel = require("../Models/CitySchema");
const axios = require("axios");

const getImageFromDuckDuckGo = async (Attraction_Name) => {
  const options = {
    method: "GET",
    url: "https://duckduckgo10.p.rapidapi.com/search/images",
    params: {
      term: Attraction_Name,
      safeSearch: "off",
      region: "in-en",
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_KEY_2,
      "X-RapidAPI-Host": "duckduckgo10.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const imageData = response.data.data[0]; // Access the first data object
    if (!imageData) {
      res.status(404).json({message : "Image not found"});
      throw new Error("Image data not found");
    }
    const imageUrl = imageData.image; // Extract the image URL
    return imageUrl;
  } catch (error) {
    console.error(error);
    getImageFromDuckImageSearch(Attraction_Name)
  }
};

const getImageFromDuckImageSearch = async (Attraction_Name) => {

  const options = {
    method: 'GET',
    url: 'https://duckduckgo-image-search.p.rapidapi.com/search/image',
    params: {q: Attraction_Name},
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_KEY_2,
      'X-RapidAPI-Host': 'duckduckgo-image-search.p.rapidapi.com'
    }
  };
  

  try {
    const response = await axios.request(options);
    const imageData = response.data.results[0]; // Access the first data object
    if (!imageData) {
      res.status(404).json({message : "Image not found"});
      throw new Error("Image data not found");
    }
    const imageUrl = imageData.image; // Extract the image URL
    return imageUrl;
  } catch (error) {
    console.error(error);
  }
};

const getAllAttractions = async (req, res) => {
  try {
    const allAttractions = await AttractionModel.find({}).populate("State").populate("City");
    console.log("allAttractions", allAttractions);
    res.status(200).json(allAttractions);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching All Attractions" });
  }
};

const createAllAttractions = async (req, res) => {
  try {
    const {
      Attraction_Name,
      State_Name,
      City_Name,
      Image,
      Attraction_Description,
      Location,
      Attraction_Type,
      Things_To_Know,
      How_To_Get_There,
    } = req.body;

    const State = await StateModel.find({ State_Name }).exec();
    const StateId = State[0]._id;
    // console.log("State", StateId);

    const City = await CityModel.find({ City_Name }).exec();
    const CityId = City[0]._id;
    // console.log("City", CityId);

    const imageURL = await getImageFromDuckImageSearch(Attraction_Name);
    const postAttraction = await AttractionModel.create({
      Attraction_Name,
      State: StateId,
      City: CityId,
      Image: imageURL,
      Attraction_Description,
      Location,
      Attraction_Type,
      Things_To_Know,
      How_To_Get_There,
    });
    res.status(201).json({ message: "Create Attraction", postAttraction });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({message : "Error adding an Attraction"})
    throw new error;
  }
};

module.exports = {
  getAllAttractions,
  createAllAttractions,
};
