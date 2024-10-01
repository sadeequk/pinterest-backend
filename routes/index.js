const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.success('Server Running'));

router.use('/auth', require('./auth.routes'));
router.use('/pin', require('./pin.routes'));
router.use('/board', require('./board.routes'));
router.use('/comment', require('./comment.routes'));
router.use('/user', require('./follow.routes'));
router.use('/tags', require('./tag.routes'));
router.use('/notifications', require('./notification.routes'));
router.use('/message', require('./message.routes'));

module.exports = router;
