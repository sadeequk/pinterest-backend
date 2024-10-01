const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/auth.mw');
const notificationController = require('../controllers/notification.controller');

// Create a new notification (system-generated)
router.post('/', ensureAuthenticated, notificationController.create_notification_post);
router.get('/:userId', ensureAuthenticated, notificationController.notifications_get);
router.put('/:notificationId/read', ensureAuthenticated, notificationController.mark_as_read_put);

module.exports = router;
