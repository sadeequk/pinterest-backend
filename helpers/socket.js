// config/socket.js or helper/socket.js

const socketIo = require('socket.io');
const Message = require('../models/message.model'); // Assuming your message model is in the models folder

let io;

const initializeSocket = (server) => {
  // Initialize Socket.IO and export it to be used elsewhere
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    // Join a conversation room
    socket.on('joinConversation', ({ conversationId }) => {
      socket.join(conversationId);
      console.log(`User joined conversation ${conversationId}`);
    });

    // Handle sending a message
    socket.on('sendMessage', async ({ conversationId, senderId, text }) => {
      try {
        // Save message to the database
        const message = new Message({
          conversationId,
          sender: senderId,
          text,
        });
        await message.save();

        // Emit the message to the conversation room
        io.to(conversationId).emit('receiveMessage', message);
      } catch (error) {
        console.error(error);
      }
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

const getIoInstance = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = {
  initializeSocket,
  getIoInstance,
};
