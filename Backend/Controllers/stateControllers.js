const { mongo } = require("mongoose");
const StateModel = require("./../Models/StateSchema");

const getAllStates = async (req, res) => {
    try {
      const allStates = await StateModel.find({});
      console.log('allStates', allStates)
      res.status(200).json(allStates);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Error fetching All States" });
    }
};


// const insertId = async(req,res)=>{
//   try {
//     const data = await StateModel.find({});
//     console.log('data', data)
//     // const jsonData = res.json(data);
//     const dataWithIds = data.map((item, idx) => {
//       console.log('item', item)
//      return { state_id: idx + 1, ...item._doc }

//   });
//     console.log('dataWithIds', dataWithIds)
//     // res.status(200).json(dataWithIds)
//     const insert = await StateModel.insertMany(dataWithIds);
//     console.log('insert', insert);

//     res.status(200).json(insert);
//   } catch (error) {
//     console.log('error', error)
//   }
// }

module.exports = {
    getAllStates,
};