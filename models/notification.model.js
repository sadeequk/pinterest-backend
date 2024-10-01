const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notificationId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  message: { type: String, required: true }, // Notification message (e.g., "UserX followed you")
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User receiving the notification
  isRead: { type: Boolean, default: false }, // Whether the notification has been read
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('notification', notificationSchema);
