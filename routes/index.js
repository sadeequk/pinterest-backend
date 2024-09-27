const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.success('Server Running'));

router.use('/auth', require('./auth.routes'));

module.exports = router;
