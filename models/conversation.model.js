const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }], // Users participating in the conversation
  createdAt: { type: Date, default: Date.now }, // Conversation start time
});

module.exports = mongoose.model('conversation', conversationSchema);
