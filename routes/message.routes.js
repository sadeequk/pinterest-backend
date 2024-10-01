const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/auth.mw');
const messageController = require('../controllers/chat.controller');

router.get('/search', ensureAuthenticated, messageController.search_user_get);

router.post('/conversations', ensureAuthenticated, messageController.createConversation);

router.post('/messages', ensureAuthenticated, messageController.sendMessage);

router.get('/conversations/:conversationId/messages', ensureAuthenticated, messageController.getMessages);

module.exports = router;
