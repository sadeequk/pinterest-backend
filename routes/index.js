const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.success('Server Running'));

router.use('/auth', require('./auth.routes'));
router.use('/pin', require('./pin.routes'));
router.use('/board', require('./board.routes'));

module.exports = router;
