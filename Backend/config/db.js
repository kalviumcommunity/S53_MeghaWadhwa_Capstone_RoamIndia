require("dotenv").config();
const mongoose = require("mongoose");

let mongoServerURL = process.env.MONGOATLAS_URL;
console.log('mongoServerURL', mongoServerURL)

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(mongoServerURL);
    console.log("Database connected");
  } catch (error) {
    console.log("error: ", error);
    console.log("Database not connected");
  }
};

module.exports = connectDB;