const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/auth.mw');
const followerController = require('../controllers/follow.controller');

router.post('/:userId/follow', ensureAuthenticated, followerController.follow_user_post);
router.post('/:userId/unfollow', ensureAuthenticated, followerController.unfollow_user_post);
router.get('/:userId/followers', ensureAuthenticated, followerController.followers_get);
router.get('/:userId/following', ensureAuthenticated, followerController.following_get);

module.exports = router;
