const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema(
  {
    // pinId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    pinName: { type: String },
    description: { type: String },
    contentUrl: { type: String },
    tags: [{ type: String }], // Array of tag names
    externalLink: { type: String }, // Optional for external link
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // assuming you have a User model
      required: true,
    },
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model('pin', pinSchema);
