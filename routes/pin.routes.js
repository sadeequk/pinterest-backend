const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/auth.mw');
const pinController = require('../controllers/pin.controller');

router.post('/', ensureAuthenticated, pinController.pin_post);
router.get('/', ensureAuthenticated, pinController.pins_get);
// Filter by tags (e.g., ?tags=sunset,nature)
router.get('/:id', ensureAuthenticated, pinController.pin_single_get);
router.put('/:id', ensureAuthenticated, pinController.pin_single_put);
router.delete('/:id', ensureAuthenticated, pinController.pin_single_delete);

module.exports = router;
