const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/post.controller');

router.get('', controllers.getAll);
router.get('/:id', controllers.getById);
router.post('/upload', controllers.uploadPost);
router.put('/edit/:id', controllers.editPost);
module.exports = router;