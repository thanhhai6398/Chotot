const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middlewares/verifyJWT');
const verifyRoles = require('../../middlewares/verifyRoles');
const controllers = require('../../controllers/category.controller');
const ROLE_LIST = require('../../utils/role_list');

router.get('', controllers.getAll);
router.use(verifyJWT);
router.use(verifyRoles(ROLE_LIST['ADMIN']));
router.get('/:id', controllers.getById);
router.post('', controllers.save);
router.delete('/:id', controllers.deleteById);
router.put('/:id', controllers.update);

module.exports = router;
