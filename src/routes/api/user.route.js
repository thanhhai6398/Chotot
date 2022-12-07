const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/user.controller');
const verifyRoles = require('../../middlewares/verifyRoles');
const ROLE_LIST = require('../../utils/role_list');

router.get('', controllers.getAll);
router.get('/:id', controllers.getById);
router.put('/:id', controllers.update);
router.put('/auhtorization/:id', verifyRoles(ROLE_LIST['ADMIN']), controllers.auhtorizationUser)
router.patch('/follow/:id', controllers.follow);
router.patch('/unfollow/:id', controllers.unfollow);
router.get("/getFollowing", controllers.getFollowing);

//router.get('/addAdmin/:id', verifyRoles(ROLE_LIST['ADMIN']), controllers.addAdmin);
router.get('/addAdmin/:id', controllers.addAdmin);

module.exports = router;
