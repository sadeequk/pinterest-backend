const Joi = require('joi');

module.exports.local_signup_post = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().required(),
});
