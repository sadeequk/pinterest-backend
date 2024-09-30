const Comment = require('../models/comment.model');
const Pin = require('../models/pin.model');

module.exports.postComment = ({ text, userId, pinId }) =>
  new Promise(async (resolve, reject) => {
    try {
      const pin = await Pin.findById(pinId);
      if (!pin) return reject(new Error('Pin not found'));
      const newComment = new Comment({
        text: text.trim(),
        createdBy: userId,
      });

      await newComment.save();
      pin.comments.push(newComment._id);
      await pin.save();
      console.log(`New Comment posted by [${userId}] on pin [${pinId}]`);
      return resolve(newComment);
    } catch (error) {
      console.log('Comment Service [postComment] Error: ', error);
      return reject(error);
    }
  });

module.exports.getCommentsAndPin = (pinId) =>
  new Promise(async (resolve, reject) => {
    try {
      const pin = await Pin.findById(pinId);

      if (!pin) {
        return reject(new Error('Pin not found'));
      }

      const comments = await Comment.find({ pin: pinId }).populate('text');

      return resolve({ pin, comments });
    } catch (error) {
      console.log('Comment Service [getCommentsAndPin] Error :', error);
      return reject(error);
    }
  });

module.exports.updateComment = ({ commentId, userId, text }) =>
  new Promise(async (resolve, reject) => {
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) return reject(new Error('Comment not found'));

      if (comment.createdBy.toString() !== userId.toString()) {
        return reject(new Error('Unauthorized'));
      }

      comment.text = text.trim();
      comment.updatedAt = Date.now();

      await comment.save();

      return resolve(comment);
    } catch (error) {
      console.log('Comment Service [updateComment] Error: ', error);
      return reject(error);
    }
  });

module.exports.deleteComment = ({ commentId, userId }) =>
  new Promise(async (resolve, reject) => {
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) return reject(new Error('Comment not found'));

      if (comment.createdBy.toString() !== userId.toString()) {
        return reject(new Error('Unauthorized'));
      }

      await Pin.updateOne({ _id: comment.pin }, { $pull: { comments: commentId } });

      await comment.remove();

      return resolve({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.log('Comment Service [deleteComment] Error: ', error);
      return reject(error);
    }
  });
