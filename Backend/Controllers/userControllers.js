const { mongo } = require("mongoose");
const { UserModel, UserSocialModel } = require("./../Models/UserSchema");
// const UserValidationSchema = require("../UserValidation");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const UserValidationSchema = require("../UserValidation");

const accessToken = async () => {
  try {
    const response = await axios.post(
      `https://${process.env.MANAGEMENT_DOMAIN}/oauth/token`,
      {
        client_id: process.env.MANAGEMENT_CLIENT_ID,
        client_secret: process.env.MANAGEMENT_CLIENT_SECRET,
        audience: `https://${process.env.MANAGEMENT_DOMAIN}/api/v2/`,
        grant_type: "client_credentials",
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const AllNonSocialUsers = await UserModel.find({});
    const AllSocialUsers = await UserSocialModel.find({});
    const AllUsers = [...AllNonSocialUsers, ...AllSocialUsers];
    console.log("AllUsers", AllUsers);
    res.status(200).json(AllUsers);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
};

const getAllNonSocialUsers = async (req, res) => {
  try {
    const AllUsers = await UserModel.find({});
    console.log("AllUsers", AllUsers);
    res.status(200).json(AllUsers);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
};

const getAllSocialUsers = async (req, res) => {
  try {
    const AllUsers = await UserSocialModel.find({});
    console.log("AllUsers", AllUsers);
    res.status(200).json(AllUsers);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
};

const getOneUser = async (req, res) => {
  try {
    const OneUser =
      (await UserModel.findById(req.params.id)) ||
      (await UserSocialModel.findById(req.params.id));
    if (!OneUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: `See User for ${req.params.id}`, OneUser });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching single User" });
  }
};

const checkUser = async (req, res) => {
  try {
    const isSocial = req.body.sub.split("|")[0] === "auth0" ? false : true;
    const OneUser = isSocial
      ? await UserSocialModel.find({ emailId: req.body.email })
      : await UserModel.find({ emailId: req.body.email }).exec();
    if (OneUser.length == 0) {
      return res
        .status(200)
        .json({ message: "User not found", found: false, isSocial });
    }

    const access_token = jwt.sign(
      OneUser[0].userName,
      process.env.JWT_SECRET_KEY
    );
    res.status(200).json({
      message: `See User for ${req.body.email}`,
      OneUser: OneUser[0],
      access_token,
      found: true,
      isSocial,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching single User" });
  }
};

const AddNewUserToNonSocial = async (req, res) => {
  try {
    const user = req.body;
    const access_token = await accessToken();

    const options = {
      method: "GET",
      url: `https://${process.env.MANAGEMENT_DOMAIN}/api/v2/users`,
      params: { q: `email:${user.email}`, search_engine: "v3" },
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    };

    const result = await axios.request(options);
    const authUser = result.data.filter(
      (e) => e.identities[0].isSocial === false
    )[0];

    const { username } = authUser;
    const { name, email } = user;
    const { error, value } = UserValidationSchema.validate(
      { Name: name, userName: username, emailId: email },
      {
        abortEarly: false,
      }
    );

    if (error) {
      console.log(error);
      const allErrors = error.details.map((e) => e.message);
      console.log({ error: allErrors });
      res.status(400).json({ error: allErrors[0] });
    } else {
      const { Name, userName, emailId } = value;
      const postUser = await UserModel.create({
        Name,
        userName,
        emailId,
        Favourites: [],
      });
      const authData = {
        userName: postUser.userName,
      };
      if (postUser) {
        const access_token = jwt.sign(
          authData.userName,
          process.env.JWT_SECRET_KEY
        );
        // console.log("access_token1: ", access_token);
        console.log({
          access_token: access_token,
          postUser: postUser,
        });

        res.status(201).json({
          access_token: access_token,
          postUser: postUser,
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send(`Internal Server Error. ${error}`);
  }
};

const AddNewUserToSocial = async (req, res) => {
  try {
    const { name, username, email } = req.body;
    const { error, value } = UserValidationSchema.validate(
      { Name: name, userName: username, emailId: email },
      {
        abortEarly: false,
      }
    );

    if (error) {
      console.log(error);
      const allErrors = error.details.map((e) => e.message);
      console.log({ error: allErrors });
      res.status(400).json({ error: allErrors[0] });
    } else {
      const { Name, userName, emailId } = value;
      const data = await UserSocialModel.find({ userName });
      if (data.length > 0) {
        return res.status(400).json({ error: "userName already exists" });
      }

      const postUser = await UserSocialModel.create({
        Name,
        userName,
        emailId,
        Favourites: [],
      });
      const authData = {
        userName: postUser.userName,
      };
      if (postUser) {
        const access_token = jwt.sign(
          authData.userName,
          process.env.JWT_SECRET_KEY
        );
        // console.log("access_token1: ", access_token);
        console.log({
          access_token: access_token,
          postUser: postUser,
        });

        res.status(201).json({
          access_token: access_token,
          postUser: postUser,
        });
      } else {
        return res.status(500).send("Failed to create new user.");
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send(`Internal Server Error. ${error}`);
  }
};

// const AddNewUserJWT = async (req, res) => {
//     try {
//       const { error, value } = UserValidationSchema.validate(req.body, {
//         abortEarly: false,
//       });
//       if (error) {
//         console.log(error);
//         const allErrors = error.details.map((e) => e.message);
//         res.status(400).json({ error: allErrors });
//       } else {
//         const { Name, userName, emailId, Favourites } = value;

//         const existingUser = await mongooseUserModel.findOne({ userName })
//         if(existingUser){
//           return res.status(400).send("User Already Exists, Please Login to Continue.")
//         }

//         const postUser = await mongooseUserModel.create({
//           Name,
//           userName,
//           emailId,
//           Favourites : [],
//         });
//         const authData = {
//           userName: postUser.userName,
//         };
//         if(postUser){
//           const access_token = jwt.sign(
//             authData.userName,
//             process.env.JWT_SECRET_KEY
//             );
//             console.log("access_token1: ", access_token);
//             res.status(201).json({
//             access_token: access_token,
//             postUser: postUser,
//           });
//           }else{
//             return res.status(400).send("Failed to create new user.")
//           }
//       }
//     } catch (error) {
//       console.log("error", error);
//       res.status(500).send(`Internal Server Error. ${err}`);
//     }
// };

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
    const deleteUser =
      (await UserModel.findByIdAndDelete(req.params.id)) ||
      (await UserSocialModel.findByIdAndDelete(req.params.id));
    console.log("deleteUser", deleteUser);
    if (deleteUser) {
      res
        .status(200)
        .json({ message: `Deleted User for ${req.params.id}`, deleteUser });
    } else {
      res
        .status(404)
        .json({ message: `User not found with ID ${req.params.id}` });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error Deleting User" });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  getAllNonSocialUsers,
  getAllSocialUsers,
  AddNewUserToNonSocial,
  AddNewUserToSocial,
  updateUser,
  deleteOneUser,
  checkUser,
};
