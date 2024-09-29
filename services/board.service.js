const Board = require('../models/board.model');
const Pin = require('../models/pin.model');

module.exports.createBoard = ({ name, description, userId, isPrivate }) =>
  new Promise(async (resolve, reject) => {
    try {
      const newBoard = new Board({
        createdBy: userId,
        name: name.trim(),
        description: description.trim(),
        isPrivate: isPrivate,
      });
      await newBoard.save();
      console.log(`New Board Created with User  [${userId}] and Name [${name}]`);
      return resolve(newBoard);
    } catch (error) {
      console.log('Pin Service [createPin] Error: ', error);
      return reject(error);
    }
  });

module.exports.getBoards = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const boards = await Board.find({ createdBy: id });
      return resolve(boards);
    } catch (error) {
      console.log(`Board Service [getBoards] Error`, error);
      return reject(error);
    }
  });

module.exports.readById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const board = await Board.findById(id).populate('pins');
      return resolve(board);
    } catch (error) {
      console.log(`Board Service [readById] Error`, error);
      return reject(error);
    }
  });

module.exports.updateById = ({ userId, id, name, description, isPrivate }) =>
  new Promise(async (resolve, reject) => {
    try {
      const board = await Board.findById(id);

      if (board.createdBy.toString() !== userId.toString()) {
        return reject(new Error('You do not have permission to update this board'));
      }
      const updatedBoard = await Board.findByIdAndUpdate(
        id,
        {
          name,
          description,
          isPrivate,
        },
        { new: true }
      );
      await updatedBoard.save();
      return resolve(updatedBoard);
    } catch (error) {
      console.log(`Board Service [updateById] Error`, error);
      return reject(error);
    }
  });

module.exports.deleteById = ({ userId, id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const board = await Board.findById(id);

      if (board.createdBy.toString() !== userId.toString()) {
        return reject(new Error('You do not have permission to Delete this board'));
      }
      const deleteBoard = await Board.findByIdAndDelete(id);
      return resolve(deleteBoard);
    } catch (error) {
      console.log(`Board Service [deleteById] Error`, error);
      return reject(error);
    }
  });

module.exports.addPin = (pinId, userId, boardId) =>
  new Promise(async (resolve, reject) => {
    try {
      const board = await Board.findById(boardId).populate('pins');
      if (!board) {
        return reject(new Error('Board not found'));
      }

      if (board.createdBy.toString() === userId.toString()) {
        const pin = await Pin.findById(pinId);
        if (!pin) {
          return reject(new Error('Pin not found'));
        }

        board.pins.push(pin._id);
        await board.save();

        return resolve(board);
      } else {
        return reject(new Error('User is not authorized to modify this board'));
      }
    } catch (error) {
      console.log('Board Service [addPin] Error:', error);
      return reject(error);
    }
  });

module.exports.removePin = (pinId, userId, boardId) =>
  new Promise(async (resolve, reject) => {
    try {
      const board = await Board.findById(boardId);
      if (!board) {
        return reject(new Error('Board not found'));
      }

      if (board.createdBy.toString() !== userId.toString()) {
        return reject(new Error('User is not authorized to modify this board'));
      }

      const pinIndex = board.pins.indexOf(pinId);
      if (pinIndex === -1) {
        return reject(new Error('Pin not found in the board'));
      }

      board.pins.splice(pinIndex, 1);
      await board.save();

      return resolve(board);
    } catch (error) {
      console.log('Board Service [removePin] Error:', error);
      return reject(error);
    }
  });
