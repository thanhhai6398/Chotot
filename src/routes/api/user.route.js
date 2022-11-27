const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/user.controller');
const verifyRoles = require('../../middlewares/verifyRoles');
const ROLE_LIST = require('../../utils/role_list');

router.get('', controllers.getAll);
router.get('/:id', controllers.getById);
router.put('/:id', controllers.update);
router.put('/auhtorization/:id', verifyRoles(ROLE_LIST['ADMIN']), controllers.auhtorizationUser)
router.patch('/:id/follow', controllers.follow);
router.patch('/:id/unfollow', controllers.unfollow);
router.get("/getFollowing", controllers.getFollowing);
module.exports = router;
