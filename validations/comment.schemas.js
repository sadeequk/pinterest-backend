const Joi = require('joi');

module.exports.comment_post = Joi.object({
  text: Joi.string().required(),
});

module.exports.update_comment = Joi.object({
  text: Joi.string().min(2).max(500).required(),
});
