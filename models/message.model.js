const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true }, // Conversation reference
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The sender of the message
  text: { type: String, required: true }, // Message text content
  createdAt: { type: Date, default: Date.now }, // Time the message was sent
});

module.exports = mongoose.model('message', messageSchema);
