const NotificationService = require('../services/notification.service');

exports.notifications_get = async (req, res) => {
  try {
    const notifications = await NotificationService.getUserNotifications(req.params.userId);
    return res.success(notifications);
  } catch (error) {
    return res.serverError(error);
  }
};

exports.mark_as_read_put = async (req, res) => {
  try {
    const updatedNotification = await NotificationService.markAsRead(req.params.notificationId);
    if (!updatedNotification) return res.fail('Notification not found');
    return res.success(updatedNotification);
  } catch (error) {
    return res.serverError(error);
  }
};

exports.create_notification_post = async (req, res) => {
  try {
    const { message, recipient } = req.body;
    const notification = await NotificationService.createNotification(message, recipient);
    return res.success(notification);
  } catch (error) {
    return res.serverError(error);
  }
};
