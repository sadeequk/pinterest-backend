const Joi = require('joi');

module.exports.pin_post = Joi.object({
  pinName: Joi.string().required(),
  description: Joi.string().required(),
  contentUrl: Joi.string().uri().required(),
  tags: Joi.array().items(Joi.string()).min(1).max(10).required(),
  board: Joi.array().items(Joi.string()).min(1).max(10).required(),
  externalLink: Joi.string().uri().optional(),
});

module.exports.pin_single_put = Joi.object({
  pinName: Joi.string().required(),
  description: Joi.string().required(),
  contentUrl: Joi.string().uri().required(),
  tags: Joi.array().items(Joi.string()).min(1).max(10).required(),
  board: Joi.array().items(Joi.string()).min(1).max(10).required(),
  externalLink: Joi.string().uri().optional(),
});
