const User = require('../models/user.model');
const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');

// Search for a user by username
exports.searchUser = async (username) => {
  return await User.findOne({ username });
};

// Create a conversation between two users
exports.createConversation = async (participants) => {
  let conversation = await Conversation.findOne({ participants: { $all: participants } });
  if (!conversation) {
    conversation = new Conversation({ participants });
    await conversation.save();
  }
  return conversation;
};

// Send a message in a conversation
exports.sendMessage = async (conversationId, sender, text) => {
  const message = new Message({
    conversationId,
    sender,
    text,
  });
  await message.save();
  return message;
};

// Get messages in a conversation
exports.getMessages = async (conversationId) => {
  return await Message.find({ conversationId }).sort({ createdAt: 1 });
};
