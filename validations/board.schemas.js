const Joi = require('joi');

module.exports.board_post = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  isPrivate: Joi.boolean().required(),
});

module.exports.board_put = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  isPrivate: Joi.boolean().required(),
});

module.exports.add_pin = Joi.object({
  pinId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/),
});
module.exports.remove_pin = Joi.object({
  pinId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/),
});
