const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/user.controller');

router.get('', controllers.getAll);
router.get('/:id', controllers.getById);
router.put('/:id', controllers.update);

module.exports = router;
