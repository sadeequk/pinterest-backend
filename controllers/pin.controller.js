const joiSchemas = require('../validations/pin.schemas');
const PinService = require('../services/pin.service');

module.exports.pin_post = async (req, res) => {
  try {
    const results = await joiSchemas.pin_post.validateAsync(req.body);
    const pin = await PinService.createPin({
      userId: req.user._id,
      pinName: results.pinName,
      contentUrl: results.contentUrl,
      description: results.description,
      externalLink: results.externalLink,
      tags: results.tags,
      board: results.board,
    });
    return res.success(pin);
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports.pin_single_get = async (req, res) => {
  try {
    const result = req.params;
    const pin = await PinService.readById(result.id);
    if (!pin) return res.fail('Pin not found');
    return res.success(pin);
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports.pins_get = async (req, res) => {
  try {
    const result = req.user;
    const pin = await PinService.readByUser(result.id);
    if (!pin) return res.fail('Pins not found');
    return res.success(pin);
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports.pin_single_put = async (req, res) => {
  try {
    const results = await joiSchemas.pin_single_put.validateAsync(req.body);
    const pin = await PinService.updatePin({
      id: req.params.id,
      pinName: results.pinName,
      contentUrl: results.contentUrl,
      description: results.description,
      externalLink: results.externalLink,
      tags: results.tags,
      board: results.board,
    });
    if (!pin) return res.fail('Pins not found');
    return res.success(pin);
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports.pin_single_delete = async (req, res) => {
  try {
    const pin = await PinService.deletePin(req.params.id);
    if (!pin) return res.fail('Pin not found');
    return res.success('Pin deleted successfully');
  } catch (error) {
    return res.serverError(error);
  }
};
