const Joi = require("joi");

const UserValidationSchema = Joi.object({
    Name: Joi.string().min(3).max(20).required(),
    userName: Joi.string().min(4).max(20).required(),
    emailId: Joi.string().email().required(),
    Favourites: Joi.array().items(Joi.string())
  });

  module.exports = UserValidationSchema;
