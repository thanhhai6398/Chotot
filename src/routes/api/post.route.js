const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/post.controller');

router.get('', controllers.getAll);
router.get('/:id', controllers.getById);
router.post('/upload', controllers.uploadPost);
router.put('/edit/:id', controllers.editPost);
router.get('/search/:nameSearch',controllers.findPostByName);
router.put('/active/:id', controllers.activePost);
router.put('/hide/:id', controllers.hidePost);

module.exports = router;