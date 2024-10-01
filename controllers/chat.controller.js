const ChatService = require('../services/chat.service');

// Search for a user by username
exports.search_user_get = async (req, res) => {
  const { username } = req.query;
  try {
    const user = await ChatService.searchUser(username);
    if (!user) return res.fail('User not Find');
    return res.success(user);
  } catch (error) {
    return res.serverrError(error);
  }
};

// Create a conversation
exports.createConversation = async (req, res) => {
  const { participants } = req.body; // Array of participant user IDs
  try {
    const conversation = await ChatService.createConversation(participants);
    return res.success(conversation);
  } catch (error) {
    return res.serverrError(error);
  }
};

// Send a message
exports.sendMessage = async (req, res) => {
  const { conversationId, sender, text } = req.body;
  try {
    const message = await ChatService.sendMessage(conversationId, sender, text);
    return res.success(message);
  } catch (error) {
    return res.serverrError(error);
  }
};

// Get all messages in a conversation
exports.getMessages = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const messages = await ChatService.getMessages(conversationId);
    return res.success(messages);
  } catch (error) {
    return res.serverrError(error);
  }
};
