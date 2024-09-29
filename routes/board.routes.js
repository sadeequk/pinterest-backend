const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth.mw');
const boardController = require('../controllers/board.controller');

router.post('/', ensureAuthenticated, boardController.board_post);
router.get('/', ensureAuthenticated, boardController.boards_get);
router.get('/:id', ensureAuthenticated, boardController.board_get);
router.put('/:id', ensureAuthenticated, boardController.board_put);
router.delete('/:id', ensureAuthenticated, boardController.board_delete);
router.post('/:id/add-pin', ensureAuthenticated, boardController.pin_post);
router.delete('/:id/remove-pin', ensureAuthenticated, boardController.pin_delete);

module.exports = router;
