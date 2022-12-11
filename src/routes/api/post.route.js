const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/post.controller');
const verifyJWT = require('../../middlewares/verifyJWT');
const verifyRoles = require('../../middlewares/verifyRoles');
const { USER } = require('../../utils/role_list');
const ROLE_LIST = require('../../utils/role_list');

router.get('', controllers.getAll);
router.get('/status/:id', controllers.getPostsByStatusId);
router.get('/:id', controllers.getById);
router.get('/search/:nameSearch', controllers.findPostByName);

router.use(verifyJWT);
router.use(verifyRoles(ROLE_LIST['ADMIN'], ROLE_LIST['USER']));
router.post('/upload', controllers.uploadPost);
router.get('/user/:id', controllers.getPostByUserId);
router.put('/edit/:id', controllers.editPost);

router.patch("/savePost/:id", verifyJWT, controllers.savePost);
router.patch("/unSavePost/:id", verifyJWT, controllers.unSavePost);
router.put('/active/:id', controllers.activePost);
router.put('/hide/:id', controllers.hidePost);

module.exports = router;
