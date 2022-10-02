const express = require('express');
const router = express.Router();
const controllers = require('../controllers/category.controller');

router.get('', controllers.getAll);
router.get('/:id', controllers.getById);
router.post('', controllers.save);
router.delete('/:id', controllers.deleteById);
router.put('/:id', controllers.update);

module.exports = router;
