const CommentService = require('../services/comment.service');
const joiSchema = require('../validations/comment.schemas');

module.exports.comment_post = async (req, res) => {
  try {
    const result = await joiSchema.comment_post.validateAsync(req.body);
    const comment = await CommentService.postComment({
      text: result.text,
      userId: req.user._id,
      pinId: req.params.pinId,
    });
    res.success(comment);
  } catch (error) {
    res.serverError(error);
  }
};

module.exports.comments_get = async (req, res) => {
  try {
    const pinWithComments = await CommentService.getCommentsAndPin(req.params.pinId);
    res.success(pinWithComments);
  } catch (error) {
    res.serverError(error);
  }
};

module.exports.comment_put = async (req, res) => {
  try {
    const result = await joiSchema.update_comment.validateAsync(req.body);
    const updatedComment = await CommentService.updateComment({
      commentId: req.params.commentId,
      userId: req.user._id,
      text: result.text,
    });
    res.success(updatedComment);
  } catch (error) {
    res.serverError(error);
  }
};

module.exports.comment_delete = async (req, res) => {
  try {
    const response = await CommentService.deleteComment({
      commentId: req.params.commentId,
      userId: req.user._id,
    });

    res.success(response);
  } catch (error) {
    if (error.message === 'Comment not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Unauthorized') {
      return res.status(403).json({ message: error.message });
    }
    res.serverError(error);
  }
};
