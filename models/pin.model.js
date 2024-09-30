const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema(
  {
    // pinId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    pinName: { type: String },
    description: { type: String },
    contentUrl: { type: String },
    tags: [{ type: String }],
    externalLink: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model('pin', pinSchema);
