const { mongo } = require("mongoose");
const StateModel = require("./../Models/StateSchema");

const getAllStates = async (req, res) => {
  try {
    const allStates = await StateModel.find({});
    console.log("allStates", allStates);
    res.status(200).json(allStates);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching All States" });
  }
};

const createState = async (req, res) => {
  const { State_Name, Popular_Attractions, State_Code, Image, Description } = req.body;
  try {
    const postState = await StateModel.create({
      State_Name,
      Popular_Attractions,
      State_Code,
      Image,
      Description,
    });
    res.status(201).json({message : "Created State", postState})
  } catch (error) {
    console.log("error", error);
    res.status(500).json({message : "Error adding a State"})
    throw error;
  }
};

module.exports = {
  getAllStates,
  createState,
};
