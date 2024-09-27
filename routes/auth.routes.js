const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/auth.mw');
const authController = require('../controllers/auth.controller');

router.post('/signup', authController.local_signup_post);
router.post('/login', authController.local_login_post);
router.get('/me', ensureAuthenticated, authController.me_get);
router.post('/change-password', ensureAuthenticated, authController.change_password_post);
router.post('/forgot-password', authController.forgot_password_post);
router.post('/reset-password', authController.reset_password_post);

router.get('/all', authController.all_users_get);
router.get('/:id', authController.single_user_get);
router.delete('/:id', authController.single_user_delete);
module.exports = router;
