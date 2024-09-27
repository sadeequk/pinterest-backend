const express = require('express');
const router = express.Router();

const { ensureAthenticated } = require('../middlewares/auth.middleware');
const authController = require('../controllers/auth.controller');

router.post('/signup', authController.local_signup_post);
module.exports = router;
