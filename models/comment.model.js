const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    //   commentId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    text: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pin: { type: mongoose.Schema.Types.ObjectId, ref: 'pin' },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model('comment', CommentSchema);
