const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user being followed
  follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user who is following
  followedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('follow', followerSchema);
