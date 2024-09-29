const BoardService = require('../services/board.service');
const joiSchemas = require('../validations/board.schemas');

module.exports.board_post = async (req, res) => {
  try {
    const results = await joiSchemas.board_post.validateAsync(req.body);
    const board = await BoardService.createBoard({
      userId: req.user._id,
      name: results.name,
      description: results.description,
      isPrivate: results.isPrivate,
    });
    return res.success(board);
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports.boards_get = async (req, res) => {
  try {
    const boards = await BoardService.getBoards(req.user._id);
    if (!boards) return res.fail('Board not found');
    return res.success(boards);
  } catch (error) {
    return res.serverError(error);
  }
};
module.exports.board_get = async (req, res) => {
  try {
    const results = req.params;
    const board = await BoardService.readById(results.id);
    if (!board) return res.fail('Board not found');

    return res.success(board);
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports.board_put = async (req, res) => {
  try {
    const results = await joiSchemas.board_put.validateAsync(req.body);
    const board = await BoardService.updateById({
      userId: req.user._id,
      id: req.params.id,
      name: results.name,
      description: results.description,
      isPrivate: results.isPrivate,
    });
    if (!board) return res.fail('Board not found');
    return res.success(board);
  } catch (error) {
    if (error.message === 'You do not have permission to update this board') {
      return res.fail(error.message);
    }
  }
  return res.serverError(error);
};

module.exports.board_delete = async (req, res) => {
  try {
    const result = req.params;
    const board = await BoardService.deleteById({
      userId: req.user._id,
      id: result.id,
    });
    if (!board) return res.fail('Board not found');
    return res.success('Board Deleted Successfully');
  } catch (error) {
    if (error.message === 'You do not have permission to Delete this board') {
      return res.fail(error.message);
    }
  }
  return res.serverError(error);
};
