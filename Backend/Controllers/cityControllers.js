const { mongo } = require("mongoose");
const CityModel = require("./../Models/CitySchema");
const StateModel = require("./../Models/StateSchema");
const axios = require("axios");

const getImageFromDuckDuckGo = async (City_Name) => {
  const options = {
    method: "GET",
    url: "https://duckduckgo-image-search.p.rapidapi.com/search/image",
    params: { q: City_Name },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_KEY,
      "X-RapidAPI-Host": "duckduckgo-image-search.p.rapidapi.com",
    },
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
    // console.error(error);
    // getImageFromGoogleAPI(City_Name)
    getImageFromGoogleSearch(City_Name);
  }
};

const getImageFromGoogleSearch = async (City_Name) => {

  const options = {
    method: "GET",
    url: "https://google-search72.p.rapidapi.com/imagesearch",
    params: {
      q: City_Name,
      gl: "in",
      lr: "lang_en",
      num: "20",
      start: "0",
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_KEY,
      "X-RapidAPI-Host": "google-search72.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const imageData = response.data.items[0]; // Access the first data object
    if (!imageData) {
      res.status(404).json({message : "Image not found"});
      throw new Error("Image data not found");
    }
    const imageUrl = imageData.originalImageUrl; // Extract the image URL
    return imageUrl;
  } catch (error) {
    // console.error(error);
  }
};

const getImageFromGoogleAPI = async(City_Name)=>{
  const options = {
    method: 'POST',
    url: 'https://google-api31.p.rapidapi.com/imagesearch',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.RAPID_KEY_2,
      'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
    },
    data: {
      text: City_Name,
      safesearch: 'off',
      region: 'in-en',
      color: '',
      size: '',
      type_image: '',
      layout: '',
      max_results: 100
    }
  };

  try {
    const response = await axios.request(options);
    const imageData = response.data.result[1]; // Access the first data object
    if (!imageData) {
      res.status(404).json({message : "Image not found"});
      throw new Error('Image data not found');
    }
    const imageUrl = imageData.image; // Extract the image URL
    return imageUrl;
  } catch (error) {
    // console.error(error);
    throw error;
  }
}

const getAllCities = async (req, res) => {
  try {
    const AllCities = await CityModel.find({}).populate("State");
    console.log("AllCities", AllCities);
    res.status(200).json(AllCities);
  } catch (error) {
    // console.log("error", error);
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

    const imageURL = await getImageFromDuckDuckGo(City_Name);
    // const imageURL = await getImageFromGoogleAPI(City_Name);
    const postCity = await CityModel.create({
      City_Name,
      State: StateId,
      Latitude,
      Longitude,
      Image: imageURL,
      City_Description,
      Iframe_Src,
      Popular_Attractions,
    });
    res.status(201).json({ message: "Create City", postCity });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({message : "Error adding a city"})
  }
};

module.exports = { getAllCities, createAllCities };
