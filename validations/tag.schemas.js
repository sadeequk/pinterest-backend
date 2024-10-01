const Joi = require('joi');

module.exports.tag_post = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Tag name must be a string',
    'string.empty': 'Tag name cannot be empty',
    'string.min': 'Tag name must be at least 3 characters',
    'string.max': 'Tag name must be less than 50 characters',
    'any.required': 'Tag name is required',
  }),
});

module.exports.tag_put = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Tag name must be a string',
    'string.empty': 'Tag name cannot be empty',
    'string.min': 'Tag name must be at least 3 characters',
    'string.max': 'Tag name must be less than 50 characters',
    'any.required': 'Tag name is required',
  }),
});
