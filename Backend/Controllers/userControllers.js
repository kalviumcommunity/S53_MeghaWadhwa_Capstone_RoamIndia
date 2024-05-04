const { mongo } = require("mongoose");
const UserModel = require("./../Models/UserSchema");
const UserValidationSchema = require("../UserValidation");

const getAllUsers = async (req, res) => {
  try {
    const AllUsers = await UserModel.find({});
    console.log("AllUsers", AllUsers);
    res.status(200).json(AllUsers);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
};

const getOneUser = async (req, res) => {
  try {
    const OneUser = await UserModel.findById(req.params.id);
    if (!OneUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: `See User for ${req.params.id}`, OneUser });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching single User" });
  }
};

// const AddNewUser = async (req, res) => {
//   try {
//     const body = req.body;
//     console.log("body", body);
//     const { Name, userName, emailId, Favourites } = body;

//     if (!Name || !userName || !emailId) {
//       res.status(400).json({ error: "All Fields are Mandatory" });
//       throw new Error("All Fields are Mandatory");
//     }
//     const postUser = await UserModel.create({
//       Name,
//       userName,
//       emailId,
//       Favourites,
//     });
//     res.status(201).json({ message: "Create User", postUser });
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).json({ message: "Error adding new User" });
//   }
// };

const AddNewUserJWT = async (req, res) => {
    try {
      const { error, value } = UserValidationSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        console.log(error);
        const allErrors = error.details.map((e) => e.message);
        res.status(400).json({ error: allErrors });
      } else {
        const { Name, userName, emailId, Favourites } = value;
  
        const existingUser = await mongooseUserModel.findOne({ userName })
        if(existingUser){
          return res.status(400).send("User Already Exists, Please Login to Continue.")
        }
  
        const postUser = await mongooseUserModel.create({
          Name,
          userName,
          emailId,
          Favourites : [],
        });
        const authData = {
          userName: postUser.userName,
        };
        if(postUser){
          const access_token = jwt.sign(
            authData.userName,
            process.env.JWT_SECRET_KEY
            );
            console.log("access_token1: ", access_token);
            res.status(201).json({
            access_token: access_token,
            postUser: postUser,
          });
          }else{
            return res.status(400).send("Failed to create new user.")
          }
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).send(`Internal Server Error. ${err}`);
    }
};

const updateUser = async (req, res) => {
  try {
    const updateOneUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Update a User", updateOneUser });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error Updating a User" });
  }
};

const deleteOneUser = async (req, res) => {
  try {
    const deleteUser = await UserModel.findByIdAndDelete(req.params.id);
    console.log('deleteUser', deleteUser)
    if (deleteUser) {
      res
        .status(200)
        .json({ message: `Deleted User for ${req.params.id}`, deleteUser });
    } else {
        res.status(404).json({ message: `User not found with ID ${req.params.id}` });
      }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error Deleting User" });
  }
};


module.exports = {
  getAllUsers,
  getOneUser,
  AddNewUser,
  updateUser,
  deleteOneUser,
};
