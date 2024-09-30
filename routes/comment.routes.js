const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/auth.mw');
const commentController = require('../controllers/comment.controller');

router.post('/:pinId', ensureAuthenticated, commentController.comment_post);
router.get('/:pinId', ensureAuthenticated, commentController.comments_get);
router.put('/:commentId', authenticateUser, commentController.comment_put);
router.delete('/:commentId', authenticateUser, commentController.comment_delete);
module.exports = router;
