const Joi = require('joi');

const now = new Date();
const hundredYearsAgo = new Date(now.setFullYear(now.getFullYear() - 100));

module.exports.local_signup_post = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  dateOfBirth: Joi.date().iso().less('now').greater(hundredYearsAgo).required().messages({
    'date.less': 'Date of birth must be in the past',
    'date.greater': 'Date of birth cannot be more than 100 years ago',
  }),
});

module.exports.local_login_post = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports.forgot_password_post = Joi.object({
  email: Joi.string().email().required(),
});

module.exports.reset_password_post = Joi.object({
  email: Joi.string().email().required(),
  forgotPasswordCode: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});
module.exports.change_password_post = Joi.object({
  currentPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
});

module.exports.single_user_get = Joi.object({
  id: Joi.string().required(),
});

module.exports.single_user_delete = Joi.object({
  id: Joi.string().required(),
});
