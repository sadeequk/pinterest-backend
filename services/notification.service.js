const Notification = require('../models/notification.model');

exports.getUserNotifications = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const notifications = await Notification.find({ recipient: userId }).sort({ createdAt: -1 });
      return resolve(notifications);
    } catch (error) {
      console.log('Notification Service [getUserNotifications] Error:', error);
      return reject(error);
    }
  });

exports.markAsRead = (notificationId) =>
  new Promise(async (resolve, reject) => {
    try {
      const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
      if (!notification) return reject(new Error('Notification not found'));
      return resolve(notification);
    } catch (error) {
      console.log('Notification Service [markAsRead] Error:', error);
      return reject(error);
    }
  });

exports.createNotification = (message, recipient) =>
  new Promise(async (resolve, reject) => {
    try {
      const notification = new Notification({ message, recipient });
      await notification.save();
      return resolve(notification);
    } catch (error) {
      console.log('Notification Service [createNotification] Error:', error);
      return reject(error);
    }
  });
