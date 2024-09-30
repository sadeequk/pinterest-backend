const Pin = require('../models/pin.model');

module.exports.createPin = ({ pinName, userId, description = '', tags, contentUrl, externalLink, board }) =>
  new Promise(async (resolve, reject) => {
    try {
      const newPin = new Pin({
        description: description.trim(),
        tags: tags,
        contentUrl: contentUrl,
        createdBy: userId,
        externalLink: externalLink,
        board: board,
        pinName: pinName.trim(),
      });
      await newPin.save();
      console.log(`New Pin Created with User  [${userId}] and Name [${pinName}]`);
      return resolve(newPin);
    } catch (error) {
      console.log('Pin Service [createPin] Error: ', error);
      return reject(error);
    }
  });

module.exports.readById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const pin = await Pin.findById(id).populate('comments');
      return resolve(pin);
    } catch (error) {
      console.log('Pin Service [readById] Error: ', error);
      return reject(error);
    }
  });

module.exports.readByUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const pins = await Pin.find({ createdBy: id }).lean();
      return resolve(pins);
    } catch (error) {
      console.log('Pin Service [readByUser] Error: ', error);
      return reject(error);
    }
  });

module.exports.updatePin = ({ pinName, description, tags, contentUrl, externalLink, board, id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const updatedPin = await Pin.findByIdAndUpdate(
        id,
        {
          description,
          pinName,
          tags,
          contentUrl,
          externalLink,
          board,
        },
        { new: true }
      );
      await updatedPin.save();
      console.log(`Pin Service: Updated Pin [${id}]`);
      return resolve(updatedPin);
    } catch (error) {
      return reject(error);
    }
  });

module.exports.deletePin = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const deletePin = await Pin.findByIdAndDelete(id);
      return resolve(deletePin);
    } catch (error) {
      console.log('Pin Service [delete] Error: ', error);
      return reject(error);
    }
  });
