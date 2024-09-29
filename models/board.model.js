const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema(
  {
    //   boardId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    boardMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    pins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pin' }],
    isPrivate: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model('board', BoardSchema);
