const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/auth.mw');
const tagController = require('../controllers/tag.controller');

router.post('/', ensureAuthenticated, tagController.tag_post);
router.get('/', tagController.tags_get);
router.get('/:id', tagController.single_tag_get);
router.put('/:id', ensureAuthenticated, tagController.tag_put);
router.delete('/:id', ensureAuthenticated, tagController.deleteTag);

module.exports = router;
