const socketIo = require('socket.io');
const Message = require('../models/message.model');

let io;

module.exports.initializeSocket = (server) => {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinConversation', ({ conversationId }) => {
      socket.join(conversationId);
      console.log(`User joined conversation ${conversationId}`);
    });

    socket.on('sendMessage', async ({ conversationId, senderId, text }) => {
      try {
        const message = new Message({
          conversationId,
          sender: senderId,
          text,
        });
        await message.save();

        io.to(conversationId).emit('receiveMessage', message);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

module.exports.getIoInstance = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
