const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/post.controller');

router.get('', controllers.getAll);
router.get('/status/:id', controllers.getPostsByStatusId);
router.get('/:id', controllers.getById);
router.get('/user/:id', controllers.getPostByUserId);
router.post('/upload', controllers.uploadPost);
router.put('/edit/:id', controllers.editPost);

router.patch("/savePost/:id", controllers.savePost);
router.patch("/unSavePost/:id", controllers.unSavePost);
router.get("/getPostsSaved", controllers.getPostsSaved);
router.get('/search/:nameSearch', controllers.findPostByName);
router.put('/active/:id', controllers.activePost);
router.put('/hide/:id', controllers.hidePost);

module.exports = router;
